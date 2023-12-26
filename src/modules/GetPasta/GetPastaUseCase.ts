import { requisitiosAxios } from '../../Axios_Request/Get';
import { PastaDTO } from '../../DTO/IPastaDTO';
import { requestUrlPasta } from '../SapiensOperations/Request_Url';

export class GetPastaUseCase {
  async execute(data: PastaDTO) {
    const URL = await requestUrlPasta.execute(data.processo_id, data.limit);
    const pasta = await requisitiosAxios.execute(data.token, URL);
    return pasta.entities;
  }
}
