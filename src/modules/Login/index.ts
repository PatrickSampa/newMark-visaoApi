import { LoginUserCase } from './LoginUserService';
import { LoginController } from './LoginController';

export const loginUserCase = new LoginUserCase();
export const loginController = new LoginController(loginUserCase);
