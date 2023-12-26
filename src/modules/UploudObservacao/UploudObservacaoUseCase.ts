import { requisitionAxiosPut } from '../../Axios_Request/Put';
import { payloadUploadObservacao } from '../SapiensOperations/RequestPayload';
import { requestUrlObservacao } from '../SapiensOperations/Request_Url';
import { ResponseProcess } from '../SapiensOperations/Response/ResponseProcess';

export class UploudObservacaoUseCase {
  async execute(
    ProcessSapiens: ResponseProcess,
    observacao: string,
    token: string,
  ) {
    const payload = await payloadUploadObservacao.execute(
      ProcessSapiens,
      observacao,
    );
    const URL = await requestUrlObservacao.execute(ProcessSapiens[0].id);
    return requisitionAxiosPut.execute(payload, token, URL);
  }
}
