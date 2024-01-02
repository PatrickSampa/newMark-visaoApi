import { GetInformationFromSapiensForSamirController } from './ReadDocumentMovimentController';
import { GetInformationFromSapiensForSamirUseCase } from './ReadDocumentMovimentUseCase';

export const getInformationFromSapiensForSamirUseCase =
  new GetInformationFromSapiensForSamirUseCase();

export const getInformationFromSapiensForSamirController =
  new GetInformationFromSapiensForSamirController(
    getInformationFromSapiensForSamirUseCase,
  );
