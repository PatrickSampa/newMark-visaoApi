import { IInformationsForCalculeDTO } from '../../../DTO/InformationsForCalculeDTO';
import { deletePDF } from '../../../Help/DeletePdf';
import { readPDF } from '../../../Help/ReadPdf';
//import { CreateHtmlFromPdf } from '../../../python';

//import { CreateHtmlFromPdf } from '../../../python';
import { getPastaUseCase } from '../../GetPasta';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getPdfSuperSapiensUseCase } from '../../GetPdfSuperSapiens';
import { getTarefaUseCase } from '../../GetTarefa';
import { getUserResponsibleIdUseCase } from '../../GetUserResponsibleId';
import { loginUserCase } from '../../Login';
import { ResponseFolder } from '../../SapiensOperations/Response/ResponseFolder';
import { ResponseProcess } from '../../SapiensOperations/Response/ResponseProcess';
import { uploadPaginaDosprevUseCase } from '../../UploadPaginaDosprev';
import { uploudObservacaoUseCase } from '../../UploudObservacao';
import { convertToDate } from '../Help/createFormatDate';
import { verificarQuantosDiasDocumentExpi } from '../Help/verificarQuantosDiasDocumentExpi';
import { encontrarEVerificarTamanho } from './TEXTE';
import { removerAcentos } from './tirar';
////import * as fs from 'fs';

//import path from 'path';

export class ReadDocumentPageUseService {
  async execute(
    email: string,
    password: string,
    observacao_sapiens: string,
    movimentacao: string[],
    conteudo: string[],
    StringBusca: string[],
    StringObservacao: string[],
    timeCreationDocument: number[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idUser: string,
    typeSearch: string,
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
        typeSearch,
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
        contador = StringBusca.length - 1;
        console.log('chegou aqui?');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const info of StringBusca) {
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

              // eslint-disable-next-line prefer-const
            });

            console.log('passou2');

            const componentesDigitaisIsTrue =
              objectsWanted?.documento?.componentesDigitais ?? false;
            console.log(observacoesFinais + 'bem aqui');
            console.log(componentesDigitaisIsTrue);
            if (objectsWanted != undefined && componentesDigitaisIsTrue) {
              const typeDocument =
                objectsWanted.documento.componentesDigitais[0].mimetype
                  .split('/')[1]
                  .trim();
              if (typeDocument == 'html') {
                const page = await uploadPaginaDosprevUseCase.execute(
                  objectsWanted.documento.componentesDigitais[0].id,
                  token,
                );
                console.log('passou3');
                const itemWantedIndexOf = page.indexOf(StringBusca[contador]);
                const itemWantedIncludes = page.includes(StringBusca[contador]);
                console.log(
                  encontrarEVerificarTamanho(
                    page,
                    StringBusca[contador],
                    //StringBusca[contador].length,
                  ),
                );
                if (itemWantedIndexOf !== -1 && itemWantedIncludes) {
                  observacoesFinais += `${StringObservacao[contador]} - SEQ ${objectsWanted.numeracaoSequencial} | `;
                  console.log('passou4');
                } else if (!itemWantedIncludes && itemWantedIndexOf == -1) {
                  observacoesFinais +=
                    StringBusca[contador] + ' NÃO ENCONTRADO - ';
                  console.log('passsou5');
                } else {
                  console.log('passou6');
                  observacoesFinais += `${StringBusca[contador]} - SEQ ${objectsWanted.numeracaoSequencial} -- ' VERFICAR OCORRÊNCIA | `;
                }
              } else {
                /* console.log('chegou aqui?');
                const teste = await CreateHtmlFromPdf();
                console.log('teste' + teste);
                const valor = fs.readFileSync(
                  './src/modules/Pdfs/patrick.html',
                  'utf8',
                );
                console.log(valor.indexOf('Empr')); */
                const responseTeste = await getPdfSuperSapiensUseCase.execute(
                  token,
                  objectsWanted.documento.componentesDigitais[0].id,
                  idUser,
                );
                if (!responseTeste) {
                  await uploudObservacaoUseCase.execute(
                    [ProcessSapiens[i]],
                    'ERRO AO LÊ O PDF',
                    token,
                  );
                  continue;
                }

                const pdfText = await readPDF(
                  `./src/modules/Pdfs/${idUser}.pdf`,
                );

                const stringIsTrue = pdfText
                  .toUpperCase()
                  .indexOf(StringBusca[contador].toUpperCase());
                if (stringIsTrue != -1) {
                  observacoesFinais += `${StringObservacao[contador]} - SEQ ${objectsWanted.numeracaoSequencial} | `;
                  console.log('achou');
                } else {
                  console.log('nao achou' + contador);

                  observacoesFinais +=
                    StringObservacao[contador] + ' NÃO ENCONTRADO | ';
                }
                await deletePDF(idUser);
                //TODOS ME ODEIAM

                //const filepath = path.join(__dirname, 'sislabra.pdf');
                /* const filepath = path.join(
                  'E:/AGU/api-mark/src/modules/Pdfs',
                  'sislabra.pdf',
                );
                fs.writeFileSync(filepath, responseTeste); */
              }
            } else {
              console.log('quantas vezes aqui' + contador);
              console.log(observacoesFinais);
              if (objectsWanted && !componentesDigitaisIsTrue) {
                observacoesFinais +=
                  'ERRO AO LÊ DOCUMENTO  ' + movimentacao[contador] + ' | ';
              } else {
                observacoesFinais +=
                  'DOCUMENTO ' + movimentacao[contador] + ' NÃO ENCONTRADO | ';
              }
            }
          }
          contador--;
        }
        console.log(observacoesFinais);
        console.log('passou5');
        if (observacoesFinais.length <= 0) {
          observacoesFinais = 'Nenhum Documento Encontrado';
        }
        //console.log(ProcessSapiens[i]);
        await uploudObservacaoUseCase.execute(
          [ProcessSapiens[i]],
          `${observacoesFinais}`,
          token,
        );

        observacoesFinais = '';
      }
      console.log('erro no retornou');
      return testabdi;
    } catch (e) {
      console.log(e);
      if (response.length > 0) {
        return response;
      } else {
        throw new Error('ERRO AO FAZER A TRIAGEM SAPIENS');
      }
    }
  }
}
