import axios from 'axios';

export class RequisitionAxiosPut {
  async execute(payload: string, token: string, URL: string) {
    const response = await axios.put(URL, JSON.parse(payload), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status == 200 ? true : false;
  }
}
