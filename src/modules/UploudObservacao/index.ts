import { UploudObservacaoController } from './UploudObservacaoController';
import { UploudObservacaoUseCase } from './UploudObservacaoUseCase';

export const uploudObservacaoUseCase = new UploudObservacaoUseCase();
export const uploudObservacaoController = new UploudObservacaoController(
  uploudObservacaoUseCase,
);
