/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
//import axios from 'axios';
import { getUserResponsibleIdUseCase } from '../../GetUserResponsibleId';
import { loginUserCase } from '../../Login';
import { getTarefaUseCase } from '../../GetTarefa';
import { ResponseProcess } from '../../SapiensOperations/Response/ResponseProcess';
import { getPastaUseCase } from '../../GetPasta';
import { ResponseFolder } from '../../SapiensOperations/Response/ResponseFolder';
import { uploudObservacaoUseCase } from '../../UploudObservacao';
import { IInformationsForCalculeDTO } from '../../../DTO/InformationsForCalculeDTO';
import { convertToDate } from '../Help/createFormatDate';
import { verificarQuantosDiasDocumentExpi } from '../Help/verificarQuantosDiasDocumentExpi';
import { removerAcentos } from '../ReadDocumentoPage/tirar';

export class GetInformationFromSapiensForSamirUseCase {
  async execute(
    email: string,
    password: string,
    observacao_sapiens: string,
    movimentacao: string[],
    conteudo: string[],
    StringObservacao: string[],
    timeCreationDocument: number[],
    typeSearch: string
  ): Promise<string | null | unknown> {
    const response: Array<IInformationsForCalculeDTO> = [];
    try {
      const token = await loginUserCase.execute({ email, password });
      const user_id = await getUserResponsibleIdUseCase.execute(token);
      const limit = 333;
      //let obj: any = '';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let contador = 0;
      let observacoesFinais: any = '';
      const testabdi: any = '';

      const ProcessSapiens: ResponseProcess = await getTarefaUseCase.execute({
        user_id,
        observacao_sapiens,
        token,
        typeSearch
      });
      //testabdi = ProcessSapiens
      console.log(ProcessSapiens.length);
      for (let i = 0; i <= ProcessSapiens.length - 1; i++) {
        console.log('entrou nos processos');
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
        contador = StringObservacao.length - 1;
        console.log('chegou aqui?');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const info of StringObservacao) {
          if (timeCreationDocument[contador]) {
            const objectsWanted = getArvoreDocumento.find((Documento) => {
              const nomeMovimentacao = Documento?.descricao;
              const nameWanted = Documento?.documento.tipoDocumento.nome;
              const name = nameWanted.indexOf(conteudo[contador].toUpperCase());

              const wantedIndexOf = nomeMovimentacao.indexOf(
                movimentacao[contador].toUpperCase(),
              );
              if (name != -1 && wantedIndexOf != -1) {
                const data = Documento.documento.dataHoraProducao.split('T')[0];
                const newDate = convertToDate(data);

                if (
                  0 >
                  verificarQuantosDiasDocumentExpi(
                    newDate,
                    timeCreationDocument[contador],
                  )
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
            console.log('pra ca');
            const objectsWanted = getArvoreDocumento.find((Documento) => {
              const nomeMovimentacao = removerAcentos(Documento?.descricao);
              const nameWanted = removerAcentos(
                Documento?.documento.tipoDocumento.nome,
              );

              // eslint-disable-next-line prettier/prettier
              let verificardorStringDescricaoOutros = Documento?.documento?.descricaoOutros

              // eslint-disable-next-line prettier/prettier
              if(!verificardorStringDescricaoOutros) {
                verificardorStringDescricaoOutros = '';
              }

              if (conteudo[contador]) {
                const name = nameWanted.indexOf(
                  removerAcentos(conteudo[contador]).toUpperCase(),
                );

                const DescricaoOutrosforof = removerAcentos(
                  verificardorStringDescricaoOutros,
                )
                  .trim()
                  .indexOf(
                    removerAcentos(conteudo[contador]).toUpperCase().trim(),
                  );

                const wantedIndexOf = nomeMovimentacao.indexOf(
                  removerAcentos(movimentacao[contador]).toUpperCase(),
                );
                /*               if (wantedIndexOf != -1) {
                  console.log(Documento.numeracaoSequencial);
                } */
                if (name != -1 && wantedIndexOf != -1) {
                  return Documento;
                }
                if (wantedIndexOf != -1 && DescricaoOutrosforof != -1) {
                  console.log('entrou');
                  return Documento;
                }
              } else {
                const wantedIndexOf = nomeMovimentacao.indexOf(
                  removerAcentos(movimentacao[contador]).toUpperCase(),
                );
                if (wantedIndexOf != -1) {
                  return Documento;
                }
              }
            });
            console.log(objectsWanted);
            //obj = objectsWanted;
            if (objectsWanted != undefined) {
              observacoesFinais += `${StringObservacao[contador]} - SEQ ${objectsWanted.numeracaoSequencial} | `;
              
            } else {
              observacoesFinais +=
                conteudo[contador] + 'Não Encontrado | ';
            }
          }
          contador--;
        }
        await uploudObservacaoUseCase.execute(
          [ProcessSapiens[i]],
          `${observacoesFinais}`,
          token,
        );
        console.log('passou6' + observacoesFinais);
        observacoesFinais = '';
      }
      return testabdi;
    } catch (e) {
      if (response.length > 0) {
        return response;
      } else {
        throw new Error('ERRO AO FAZER A TRIAGEM SAPIENS');
      }
    }
  }
}
