import { GetTarefaController } from './GetTarefaController';
import { GetTarefaUseCase } from './GetTarefaUserCase';

export const getTarefaUseCase = new GetTarefaUseCase();
export const getTarefaController = new GetTarefaController(getTarefaUseCase);
