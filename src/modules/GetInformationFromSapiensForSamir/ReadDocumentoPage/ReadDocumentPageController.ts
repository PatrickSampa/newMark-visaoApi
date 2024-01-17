import { Request, Response } from 'express';
import { ReadDocumentPageUseService } from './ReadDocumentPageUseService';

export class ReadDocumentPageUseController {
  constructor(private readDocumentPageUseService: ReadDocumentPageUseService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      email,
      password,
      observacao_sapiens,
      movimentacao,
      conteudo,
      StringBusca,
      StringObservacao,
      timeCreationDocument,
      idUser,
    } = request.body;
    console.log(request.body);
    try {
      const responseInfo = await this.readDocumentPageUseService.execute(
        email,
        password,
        observacao_sapiens,
        movimentacao,
        conteudo,
        StringBusca,
        StringObservacao,
        timeCreationDocument,
        idUser,
      );
      return response.status(200).json(responseInfo);
    } catch (erro) {
      return response.status(400).json({
        message: 'ERRO AO FAZER A TRIAGEM SAPIENS',
      });
    }
  }
}
