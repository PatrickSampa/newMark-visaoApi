import { Request, Response } from 'express';
import { ReadDocumentPageUseService } from './ReadDocumentPageUseService';


export class ReadDocumentPageUseController {
  constructor(
    private readDocumentPageUseService: ReadDocumentPageUseService,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      email,
      password,
      observacao_sapiens,
      movimentacao,
      conteudo,
      timeCreationDocument,
      StringBusca
    } = request.body;
    
    try {
      const responseInfo =
        await this.readDocumentPageUseService.execute(
          email,
          password,
          observacao_sapiens,
          movimentacao,
          conteudo,
          timeCreationDocument,
          StringBusca
        );
      return response.status(200).json(responseInfo);
    } catch (erro) {
      return response.status(400).json({
        message: 'ERRO AO FAZER A TRIAGEM SAPIENS',
      });
    }
  }
}
