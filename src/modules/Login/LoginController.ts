import { Request, Response } from 'express';
import { LoginUserCase } from './LoginUserService';

export class LoginController {
  constructor(private loginUserCase: LoginUserCase) {}

  async handle(
    request: Request,
    response: Response,
  ): Promise<Response | unknown> {
    const { username, password } = request.body;
    try {
      const bearenToken = await this.loginUserCase.execute({
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
