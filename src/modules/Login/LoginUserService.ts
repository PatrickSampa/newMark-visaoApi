import { loginAxios } from '../../Axios_Request/Post';
import { LoginDTO } from '../../DTO/ILoginDTO';
import { requestUrlLogin } from '../SapiensOperations/Request_Url';

export class LoginUserCase {
  async execute(data: LoginDTO): Promise<string> {
    const URL = await requestUrlLogin.handle();
    const bearenToken = await loginAxios.handle(data, URL);
    return bearenToken;
  }
}
