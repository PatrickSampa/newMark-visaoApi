import { Request, Response } from 'express';
import { GetResponsibleIdUseCase } from './GetUserResponsibleIdUseCase';

export class GetUserResponsibleIdController {
  constructor(private getUserResponsibleIdUseCase: GetResponsibleIdUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    try {
      const IdResponsibleUser =
        await this.getUserResponsibleIdUseCase.execute(token);
      return response.status(200).json(IdResponsibleUser);
    } catch (error) {
      return response.status(401).json({
        message: error || 'Unexpected error',
      });
    }
  }
}
