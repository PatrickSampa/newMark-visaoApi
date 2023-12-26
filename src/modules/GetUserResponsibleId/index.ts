import { GetResponsibleIdUseCase } from './GetUserResponsibleIdUseCase';
import { GetUserResponsibleIdController } from './GetUserResponsibleIdController';

export const getUserResponsibleIdUseCase = new GetResponsibleIdUseCase();

export const getUserResponsibleIdController =
  new GetUserResponsibleIdController(getUserResponsibleIdUseCase);
