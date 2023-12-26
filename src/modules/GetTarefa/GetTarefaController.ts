import { Request, Response } from 'express';
import { GetTarefaUseCase } from './GetTarefaUserCase';

export class GetTarefaController {
  constructor(private getTarefaUseCase: GetTarefaUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id, observacao_sapiens, token } = request.body;

      const tarefas = this.getTarefaUseCase.execute({
        user_id,
        observacao_sapiens,
        token,
      });
      return response.status(200).json(tarefas);
    } catch (erro) {
      return response.status(400).json({
        message: 'ERRO AO FAZER A TRIAGEM SAPIENS',
      });
    }
  }
}
