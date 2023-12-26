import { requisitiosAxios } from '../../Axios_Request/Get';
import { decodeBase64FileWithHash } from '../../Help/DescriptografarBase64';
import { requestUrlPaginaDosprev } from '../SapiensOperations/Request_Url';

export class UploadPaginaDosprevUseCase {
  async execute(documento_id: number, token: string) {
    const URL = await requestUrlPaginaDosprev.execute(documento_id);
    const parginaDosprev = await requisitiosAxios.execute(token, URL);
    return decodeBase64FileWithHash(
      parginaDosprev.conteudo.split('base64')[1].slice(1),
    );
  }
}
