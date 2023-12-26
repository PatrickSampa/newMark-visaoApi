import axios from 'axios';
import { LoginDTO } from '../../DTO/ILoginDTO';

export class LoginAxios {
  async handle(data: LoginDTO, URL: string): Promise<string> {
    const response = await axios.post(URL, {
      username: data.username,
      password: data.password,
    });

    return response.data.token;
  }
}
