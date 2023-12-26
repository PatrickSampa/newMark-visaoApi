import { Request, Response } from 'express';
import { GetInformationFromSapiensForSamirUseCase } from './GetInformationFromSapiensForSamirUseCase';

export class GetInformationFromSapiensForSamirController {
  constructor(
    private getInformationFromSapiensForSamirUseCase: GetInformationFromSapiensForSamirUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, observacao_sapiens } = request.body;

    try {
      const responseInfo =
        await this.getInformationFromSapiensForSamirUseCase.execute(
          email,
          password,
          observacao_sapiens,
        );
      return response.status(200).json(responseInfo);
    } catch (erro) {
      return response.status(400).json({
        message: 'ERRO AO FAZER A TRIAGEM SAPIENS',
      });
    }
  }
}
