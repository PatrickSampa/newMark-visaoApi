import { IInformationsForCalculeDTO } from '../../../DTO/InformationsForCalculeDTO';
import { MinhaErroPersonalizado } from '../../../Help/ErroMessage';
import { getXPathText } from '../../../Help/GetTextoPorXPATH';
import { VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie } from '../../../Help/VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie';
import { ResponseFolder } from '../../SapiensOperations/Response/ResponseFolder';
import { coletarCitacao } from '../Help/coletarCitacao';
import { fazerInformationsForCalculeDTO } from '../Help/contruirInformationsForCalcule';
import { getInformaçoesIniciasDosBeneficios } from '../Help/getInformaçoesIniciasDosBeneficios';
import { getInformaçoesSecudariaDosBeneficios } from '../Help/getInformaçoesSecudariaDosBeneficios';
import { isValidInformationsForCalculeDTO } from '../Help/validadorDeInformationsForCalculeDTO';

export class GetOldDosprevForSamirFromSuperSapiens {
  async execute(
    paginaDosprev: any,
    processo_id: string,
    idDosprev: number,
    idComponentesGigitais: number,
    arrayDeDocumentos: ResponseFolder,
    tarefaId: string,
  ) {
    const xpathInformacaoDeCabeçalho = '/html/body/div/p[2]/b[1]';
    const informacaoDeCabeçalho = getXPathText(
      paginaDosprev,
      xpathInformacaoDeCabeçalho,
    );
    const informacaoDeCabeçalhoNaoExiste = !informacaoDeCabeçalho;
    if (informacaoDeCabeçalhoNaoExiste) {
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

    // eslint-disable-next-line prefer-const
    let beneficios = await getInformaçoesIniciasDosBeneficios(paginaDosprev);
    if (beneficios.length <= 0) {
      throw new MinhaErroPersonalizado('DOSPREV SEM BENEFICIOS VALIDOS');
    }

    beneficios = await getInformaçoesSecudariaDosBeneficios(
      beneficios,
      paginaDosprev,
    );

    const xpathNumeroDoProcesso = '/html/body/div/div/table/tbody/tr/td';
    const numeroDoProcesso: string | null = getXPathText(
      paginaDosprev,
      xpathNumeroDoProcesso,
    );

    const xpathdataAjuizamento = '/html/body/div/div[1]/table/tbody/tr[2]/td';
    const dataAjuizamento: string | null = getXPathText(
      paginaDosprev,
      xpathdataAjuizamento,
    );

    const xpathNome = '/html/body/div/div[1]/table/tbody/tr[6]/td[1]';
    const nome: string | null = getXPathText(paginaDosprev, xpathNome);

    const xpathCpf = '/html/body/div/div[1]/table/tbody/tr[7]/td';
    const cpf: string | null = getXPathText(paginaDosprev, xpathCpf);

    const urlProcesso = `https://supersapiens.agu.gov.br/apps/processo/${processo_id}/visualizar/${idDosprev}-${idComponentesGigitais}`;

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
