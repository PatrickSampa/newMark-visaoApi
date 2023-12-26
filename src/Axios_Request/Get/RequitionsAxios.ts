import axios from 'axios';

export class RequisitiosAxios {
  async execute(token: string, URL: string) {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}
