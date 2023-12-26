import { GetPastaController } from './GetPastaController';
import { GetPastaUseCase } from './GetPastaUseCase';

export const getPastaUseCase = new GetPastaUseCase();
export const getPastaController = new GetPastaController(getPastaUseCase);
