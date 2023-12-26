import { GetInformationFromSapiensForSamirController } from './GetInformationFromSapiensForSamirController';
import { GetInformationFromSapiensForSamirUseCase } from './GetInformationFromSapiensForSamirUseCase';

export const getInformationFromSapiensForSamirUseCase =
  new GetInformationFromSapiensForSamirUseCase();

export const getInformationFromSapiensForSamirController =
  new GetInformationFromSapiensForSamirController(
    getInformationFromSapiensForSamirUseCase,
  );
