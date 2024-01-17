import axios from 'axios';

export class RequisitionAxiosPdf {
  async execute(token: string, URL: string) {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/pdf',
      },
    });

    return Buffer.from(
      response.data.conteudo.split('base64')[1].slice(1),
      'base64',
    );
  }
}
