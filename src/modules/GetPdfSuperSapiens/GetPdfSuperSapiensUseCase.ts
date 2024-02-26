import { requestUrlDonwloadPdf } from '../SapiensOperations/Request_Url';
import { requisitionAxiosPdf } from '../../Axios_Request/Get';
import path from 'path';
import * as fs from 'fs';

export class GetPdfSuperSapiensUseCase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(token: string, id: number, idUser: string) {
    try {
      const URL = await requestUrlDonwloadPdf.execute(id);
      /*     const URL = `https://supersapiensbackend.agu.gov.br/v1/administrativo/componente_digital/${id}/download?context=%7B%7D`;
  
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/pdf',
        },
      });
  
      return Buffer.from(
        response.data.conteudo.split('base64')[1].slice(1),
        'base64',
      ); */
      const donwloadPdf = await requisitionAxiosPdf.execute(token, URL);
      console.log(idUser);
      const filepath = path.join('./src/modules/Pdfs', `${idUser}.pdf`);
      fs.writeFileSync(filepath, donwloadPdf);
      return true;
    } catch (e) {
      return false;
    }
  }
}
