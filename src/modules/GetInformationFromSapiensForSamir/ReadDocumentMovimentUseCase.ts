//import axios from 'axios';
import { getUserResponsibleIdUseCase } from '../GetUserResponsibleId';
import { loginUserCase } from '../Login';

//const { JSDOM } = require('jsdom');
//import { decodeBase64FileWithHash } from '../../Help/teste';
import { getTarefaUseCase } from '../GetTarefa';
import { ResponseProcess } from '../SapiensOperations/Response/ResponseProcess';
import { getPastaUseCase } from '../GetPasta';
import { ResponseFolder } from '../SapiensOperations/Response/ResponseFolder';
import { uploudObservacaoUseCase } from '../UploudObservacao';

import { IInformationsForCalculeDTO } from '../../DTO/InformationsForCalculeDTO';
import { convertToDate } from './Help/createFormatDate';
import { verificarQuantosDiasDocumentExpi } from './Help/verificarQuantosDiasDocumentExpi';

export class GetInformationFromSapiensForSamirUseCase {
  async execute(
    username: string,
    password: string,
    observacao_sapiens: string,
    movimentacao: string,
    conteudo: string,
    timeCreationDocument?: number,
  ): Promise<string | null | unknown> {
    const response: Array<IInformationsForCalculeDTO> = [];
    try {
      const token = await loginUserCase.execute({ username, password });
      const user_id = await getUserResponsibleIdUseCase.execute(token);
      const limit = 333;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const objectComCertezaDeExistir = false;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const objectPodeOuNaoExistir = false;

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
          if (objectsWanted != undefined) {
            //etiquetar a etiqueta que o usuario informou
            console.log('PASSOU');
          } else {
            //String não encontrada
          }
        }

        /* const objectDosPrevMaisAtual = getArvoreDocumento.find((Documento) => {
          const movimento = Documento?.descricao.split('.');
          return movimento[0] == 'JUNTADA DOSSIE DOSSIE PREVIDENCIARIO REF';
        });

        const objetoAntigoDosprevMaisAtual = getArvoreDocumento.find(
          (Documento) =>
            Documento?.documento?.tipoDocumento?.sigla == 'DOSPREV',
        );
 */
        return 'dasdads';
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
