import { IInformationsForCalculeDTO } from '../../../DTO/InformationsForCalculeDTO';
import { CreateHtmlFromPdf } from '../../../python';
import { getPastaUseCase } from '../../GetPasta';
import { getTarefaUseCase } from '../../GetTarefa';
import { getUserResponsibleIdUseCase } from '../../GetUserResponsibleId';
import { loginUserCase } from '../../Login';
import { ResponseFolder } from '../../SapiensOperations/Response/ResponseFolder';
import { ResponseProcess } from '../../SapiensOperations/Response/ResponseProcess';
import { uploadPaginaDosprevUseCase } from '../../UploadPaginaDosprev';
import { uploudObservacaoUseCase } from '../../UploudObservacao';
import { convertToDate } from '../Help/createFormatDate';
import { verificarQuantosDiasDocumentExpi } from '../Help/verificarQuantosDiasDocumentExpi';
import * as fs from "fs";

export class ReadDocumentPageUseService {
  async execute(
    username: string,
    password: string,
    observacao_sapiens: string,
    movimentacao: string,
    conteudo: string,
    timeCreationDocument?: number,
    StringBusca?: string
  ): Promise<string | null | unknown> {
    const response: Array<IInformationsForCalculeDTO> = [];
    try {
      const token = await loginUserCase.execute({ username, password });
      const user_id = await getUserResponsibleIdUseCase.execute(token);
      const limit = 333;
      let obj: any = "";

      const ProcessSapiens: ResponseProcess = await getTarefaUseCase.execute({
        user_id,
        observacao_sapiens,
        token,
      });
      for (let i = 0; i <= ProcessSapiens.length - 1; i++) {
        const processo_id = ProcessSapiens[i].processo.id;
        const getArvoreDocumento: ResponseFolder =
          await getPastaUseCase.execute({
            processo_id,
            limit,
            token,
          });

        if (getArvoreDocumento.length <= 0) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[i]],
            'ERRO AO LÊ ARVORE DE DOCUMENTO',
            token,
          );
          continue;
        }


        if (timeCreationDocument) {
          const objectsWanted = getArvoreDocumento.find((Documento) => {
            const nomeMovimentacao = Documento?.descricao;
            const nameWanted = Documento?.documento.tipoDocumento.nome;
            const name = nameWanted == conteudo;

            const wantedIndexOf = nomeMovimentacao.indexOf(
              movimentacao.toUpperCase(),
            );
            if (name && wantedIndexOf != -1) {
              const data = Documento.documento.dataHoraProducao.split('T')[0];
              const newDate = convertToDate(data);

              if (
                0 >
                verificarQuantosDiasDocumentExpi(newDate, timeCreationDocument)
              ) {
                //processo invalido fora do prazo
              } else {
                return Documento;
              }
            }
          });
          if (objectsWanted != undefined) {
            //etiquetar processo com a string que o usuario informou
          } else {
            //etiquetar processo invalido fora do prazo
          }
        } else {
          const objectsWanted = getArvoreDocumento.find((Documento) => {
            const nomeMovimentacao = Documento?.descricao;
            const nameWanted = Documento?.documento.tipoDocumento.nome;
            const name = nameWanted == conteudo;

            const wantedIndexOf = nomeMovimentacao.indexOf(
              movimentacao.toUpperCase(),
            );
            if (name && wantedIndexOf != -1) {
              return Documento;
            }
          });
          obj = objectsWanted;
          if (objectsWanted != undefined) {
            const typeDocument = objectsWanted.documento.componentesDigitais[0].mimetype.split("/")[1].trim();
            if(typeDocument == "html"){
              const page = await uploadPaginaDosprevUseCase.execute(objectsWanted.documento.componentesDigitais[0].id,
                token)
                
                const itemWantedIndexOf = page.indexOf(StringBusca)
                const itemWantedIncludes = page.includes(StringBusca)
                
                if(itemWantedIndexOf !== -1 && itemWantedIncludes){
                  //etiquetar
                 await CreateHtmlFromPdf();
                 const content = fs.readFileSync('./src/FileHtml/teste.html', "utf-8");
                 console.log(content.indexOf("SEM RESTRICAO"))
                }else if(!itemWantedIncludes && itemWantedIndexOf == -1){
                  //etiquetar
                }else{
                  //etiquetar
                }
            }else{
              console.log("PDF")
              //aqui vai ser o pdf
            }
            

            
          } else {
            //String não encontrada
          }
        }

        return obj;
      }
    } catch (e) {
      if (response.length > 0) {
        return response;
      } else {
        throw new Error('ERRO AO FAZER A TRIAGEM SAPIENS');
      }
    }
  }
}
