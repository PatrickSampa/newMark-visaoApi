import { IInformationsForCalculeDTO } from '../../../DTO/InformationsForCalculeDTO';
import { MinhaErroPersonalizado } from '../../../Help/ErroMessage';
import { getXPathText } from '../../../Help/GetTextoPorXPATH';
import { VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie } from '../../../Help/VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie';
import { ResponseFolder } from '../../SapiensOperations/Response/ResponseFolder';
import { coletarCitacao } from '../Help/coletarCitacao';
import { fazerInformationsForCalculeDTO } from '../Help/contruirInformationsForCalcule';
import { getInformaçoesIniciasDosBeneficiosSuperDosprev } from '../Help/getInformaçoesIniciasDosBeneficiosSuperDosprev';
import { getInformaçoesSecudariaDosBeneficiosSuperDossie } from '../Help/getInformaçoesSecudariaDosBeneficiosSuperDossie';
import { isValidInformationsForCalculeDTO } from '../Help/validadorDeInformationsForCalculeDTO';

export class GetNewDosprevForSamirFromSuperSapies {
  async execute(
    paginaDosprev: any,
    processo_id: string,
    idDosprev: number,
    idComponentesGigitais: number,
    arrayDeDocumentos: ResponseFolder,
    tarefaId: string,
  ) {
    const xpaththInformacaoCabecalho = '/html/body/div/div[3]/p/strong';
    const informacaoDeCabeçalho = getXPathText(
      paginaDosprev,
      xpaththInformacaoCabecalho,
    );

    const informacaoDeCabecalhoNaoExiste = !informacaoDeCabeçalho;
    if (informacaoDeCabecalhoNaoExiste) {
      throw new MinhaErroPersonalizado('DOSPREV FORA DO PRAZO DE VALIDADE');
    }

    if (
      0 >
      VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie(
        informacaoDeCabeçalho,
      )
    ) {
      throw new MinhaErroPersonalizado('DOSPREV FORA DO PRAZO DE VALIDADE');
    }

    // eslint-disable-next-line no-var
    var beneficios =
      await getInformaçoesIniciasDosBeneficiosSuperDosprev(paginaDosprev);

    if (beneficios.length <= 0) {
      throw new MinhaErroPersonalizado('DOSPREV SEM BENEFICIO VALIDOS');
    }

    beneficios = await getInformaçoesSecudariaDosBeneficiosSuperDossie(
      beneficios,
      paginaDosprev,
    );

    const xptahNumeroProcesso = '/html/body/div/div[4]/table/tbody/tr[1]/td';
    const numeroDoProcesso: string | undefined = getXPathText(
      paginaDosprev,
      xptahNumeroProcesso,
    )?.replace(/\D/g, '');

    const xpathdataAjuizamento = '/html/body/div/div[4]/table/tbody/tr[2]/td';
    const dataAjuizamento: string | null = getXPathText(
      paginaDosprev,
      xpathdataAjuizamento,
    );

    const xpathNome = '/html/body/div/div[4]/table/tbody/tr[6]/td';

    const nome: string | null = getXPathText(paginaDosprev, xpathNome);

    const xpathCpf = '/html/body/div/div[4]/table/tbody/tr[7]/td';
    const cpf: string | null = getXPathText(paginaDosprev, xpathCpf);
    const urlProcesso = `https://supersapiens.agu.gov.br/apps/processo/${processo_id}/visualizar/${idDosprev}-${idComponentesGigitais}`;

    // eslint-disable-next-line prefer-const
    let citacao = coletarCitacao(arrayDeDocumentos);
    if (!citacao) citacao = null;

    if (!nome || !dataAjuizamento || !numeroDoProcesso || !cpf)
      throw new MinhaErroPersonalizado('DOSPREV COM FALHA NA LEITURA');
    const id = Number(tarefaId);

    try {
      const informationsForCalculeDTO: IInformationsForCalculeDTO =
        await fazerInformationsForCalculeDTO(
          beneficios,
          numeroDoProcesso,
          dataAjuizamento,
          nome,
          cpf,
          urlProcesso,
          citacao,
          id,
        );
      if (isValidInformationsForCalculeDTO(informationsForCalculeDTO)) {
        return informationsForCalculeDTO;
      } else {
        throw new MinhaErroPersonalizado('FALHA NA LEITURA DOS BENEFICIOS');
      }
    } catch (e) {
      throw new MinhaErroPersonalizado('FALHA NA LEITURA DOS BENEFICIOS');
    }
  }
}
