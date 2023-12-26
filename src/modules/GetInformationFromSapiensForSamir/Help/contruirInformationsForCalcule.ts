import { IBeneficiosAcumuladoForCalculeDTO } from '../../../DTO/BeneficiosAcumuladoForCalculeDTO';
import { IBeneficiosDTO } from '../../../DTO/BeneficiosDTO';
import { IInformationsForCalculeDTO } from '../../../DTO/InformationsForCalculeDTO';
import { convertToDate } from './createFormatDate';

let beneficioPrincipal: any;

export async function fazerInformationsForCalculeDTO(
  beneficios: IBeneficiosDTO[],
  numeroDoProcesso: string,
  dataAjuizamento: string,
  nome: string,
  cpf: string,
  urlProcesso: string,
  citacao: string | null,
  id: number,
): Promise<IInformationsForCalculeDTO> {
  let result: IInformationsForCalculeDTO = {
    beneficio: '',
    dibAnterior: '',
    beneficioAcumuladoBoolean: false,
    dibInicial: '',
    dip: '',
    id: id,
    nb: '',
    rmi: '',
    tipo: '',
    numeroDoProcesso,
    dataAjuizamento,
    nome,
    cpf,
    urlProcesso,
    citacao,
  };
  result = await preencherBeneficioPrincipal(result, beneficios[0]);
  beneficioPrincipal = result;
  for (const beneficio of beneficios) {
    if (beneficio.nb == result.nb) {
      continue;
    }
    const beneficioPrincipalNaoEAtivo_Mas_BeneficioPesquisadoSim =
      result.tipo != 'ATIVO' && beneficio.tipo == 'ATIVO';
    const beneficiosComMesmoTipo_Porem__BeneficosPesquisadoTem_Dib_Diferente_DIP =
      result.tipo == beneficio.tipo && beneficio.dip != beneficio.dib;
    if (
      beneficioPrincipalNaoEAtivo_Mas_BeneficioPesquisadoSim ||
      beneficiosComMesmoTipo_Porem__BeneficosPesquisadoTem_Dib_Diferente_DIP
    ) {
      result = preencherBeneficioPrincipal(result, beneficio);
      beneficioPrincipal = result;
    }
  }
  beneficios = beneficios.filter((beneficios) => beneficios.nb != result.nb);
  const beneficiosAcumulados: IBeneficiosAcumuladoForCalculeDTO[] =
    await converterArrayDeBenefiosParaArrayDeBeneficiosAcumulados(beneficios);
  result.beneficiosAcumulados = beneficiosAcumulados;
  result.beneficioAcumuladoBoolean = beneficiosAcumulados.length > 0;
  return await result;
}
function preencherBeneficioPrincipal(
  result: IInformationsForCalculeDTO,
  beneficio: IBeneficiosDTO,
): IInformationsForCalculeDTO {
  if (
    !beneficio.beneficio ||
    !beneficio.dip ||
    !beneficio.dib ||
    !beneficio.dcb ||
    !beneficio.dibAnterior ||
    !beneficio.rmi ||
    !beneficio.nb ||
    !beneficio.tipo
  )
    throw new Error('SAPIENS COM FALHA NA LEITURA');

  result.beneficio = beneficio.beneficio;
  result.dip = beneficio.dip;
  result.dibInicial = beneficio.dib;
  result.dibFinal = beneficio.dcb;
  result.dibAnterior = beneficio.dibAnterior;
  result.rmi = beneficio.rmi;
  result.nb = beneficio.nb;
  result.tipo = beneficio.tipo;

  return result;
}
async function converterArrayDeBenefiosParaArrayDeBeneficiosAcumulados(
  beneficios: IBeneficiosDTO[],
): Promise<IBeneficiosAcumuladoForCalculeDTO[]> {
  const beneficiosAcumulados: IBeneficiosAcumuladoForCalculeDTO[] = [];
  for (const beneficio of beneficios) {
    if (
      !beneficio.dib ||
      !beneficio.dcb ||
      !beneficio.beneficio ||
      !beneficio.rmi ||
      !beneficio.nb ||
      !beneficio.dibAnterior
    )
      throw new Error('SAPIENS COM FALHA NA LEITURA');

    if (
      (convertToDate(beneficioPrincipal.dibInicial) <=
        convertToDate(beneficio.dib) &&
        convertToDate(beneficioPrincipal.dip) >=
          convertToDate(beneficio.dib)) ||
      (convertToDate(beneficioPrincipal.dibInicial) >=
        convertToDate(beneficio.dib) &&
        convertToDate(beneficioPrincipal.dip) >= convertToDate(beneficio.dcb) &&
        convertToDate(beneficio.dcb) >=
          convertToDate(beneficioPrincipal.dibInicial))
    ) {
      beneficiosAcumulados.push({
        beneficio: beneficio.beneficio,
        dcb: beneficio.dcb,
        dib: beneficio.dib,
        rmi: beneficio.rmi,
        nb: beneficio.nb,
        dibAnterior: beneficio.dibAnterior,
      });
    }
  }
  return await beneficiosAcumulados;
}
