import axios from 'axios';
import { requisitiosAxios } from '../../Axios_Request/Get';
//import { requestUrlDonwloadPdf } from '../SapiensOperations/Request_Url';

export class GetPdfSuperSapiensUseCase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(token: string , id: number) {
    //const URL = await requestUrlDonwloadPdf.execute(id);
    const URL =
      `https://supersapiensbackend.agu.gov.br/v1/administrativo/componente_digital/${id}/download?context=%7B%7D`;
    /* const URL =
      'https://supersapiensbackend.agu.gov.br/v1/administrativo/componente_digital/1383494582/download?context=%7B%7D'; */
    /* const response = requisitiosAxios.execute(token, URL); */
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/pdf',
      },
    });
    
    return Buffer.from(response.data.conteudo.split('base64')[1].slice(1), 'base64');
    
  }
}
