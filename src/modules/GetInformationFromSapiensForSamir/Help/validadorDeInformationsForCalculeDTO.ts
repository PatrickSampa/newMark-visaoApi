import { IInformationsForCalculeDTO } from '../../../DTO/InformationsForCalculeDTO';

export function isValidInformationsForCalculeDTO(
  data: IInformationsForCalculeDTO,
): boolean {
  return Boolean(
    data.beneficio &&
      data.cpf &&
      data.dibInicial &&
      data.dibAnterior &&
      data.dip,
  );
}
