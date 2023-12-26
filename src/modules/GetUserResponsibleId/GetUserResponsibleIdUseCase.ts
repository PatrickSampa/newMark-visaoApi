import axios from 'axios';

export class GetResponsibleIdUseCase {
  async execute(token: string): Promise<string> {
    const URL = 'https://supersapiensbackend.agu.gov.br/profile';

    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.id;
  }
}
