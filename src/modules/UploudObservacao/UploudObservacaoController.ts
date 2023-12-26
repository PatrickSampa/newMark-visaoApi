import { Request, Response } from 'express';
import { UploudObservacaoUseCase } from './UploudObservacaoUseCase';


export class UploudObservacaoController {
  constructor(private uploudObservacaoUseCase: UploudObservacaoUseCase) {}

  async handle(
    request: Request,
    response: Response,
  ): Promise<Response | unknown> {
    const { username, password } = request.body;
    try {
      const bearenToken = await this.uploudObservacaoUseCase.execute({
        username,
        password,
      });
      return response.status(200).json(bearenToken);
    } catch (error) {
      return response.status(400).json({
        message: 'Usuario Super Sapiens Incorreto',
      });
    }
  }
}
