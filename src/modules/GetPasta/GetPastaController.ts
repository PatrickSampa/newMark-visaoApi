import { Request, Response } from 'express';
import { GetPastaUseCase } from './GetPastaUseCase';

export class GetPastaController {
  constructor(private getPastaUseCase: GetPastaUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { processo_id, limit, token } = request.body;

      const tarefas = this.getPastaUseCase.execute({
        processo_id,
        limit,
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
