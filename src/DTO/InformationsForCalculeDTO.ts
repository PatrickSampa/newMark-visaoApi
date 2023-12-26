import { IBeneficiosAcumuladoForCalculeDTO } from './BeneficiosAcumuladoForCalculeDTO';

export interface IInformationsForCalculeDTO {
  id: number;
  numeroDoProcesso: string;
  nome: string;
  dataAjuizamento: string;
  cpf: string;
  dibInicial: string;
  dibFinal?: string;
  rmi: string;
  beneficio: string;
  nb: string;
  dip: string;
  aps?: string;
  citacao?: string | null;
  beneficiosAcumulados?: IBeneficiosAcumuladoForCalculeDTO[];
  urlProcesso: string;
  dibAnterior: string;
  beneficioAcumuladoBoolean: boolean;
  tipo: string;
}
