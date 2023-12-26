import { requisitiosAxios } from '../../Axios_Request/Get';
import { TarefasDTO } from '../../DTO/ITarefasDTO';
import { requestUrlTarefa } from '../SapiensOperations/Request_Url';

export class GetTarefaUseCase {
  async execute(data: TarefasDTO) {
    const { user_id, observacao_sapiens } = data;
    const URL = await requestUrlTarefa.execute(user_id, observacao_sapiens);
    const tarefas = await requisitiosAxios.execute(data.token, URL);
    return tarefas.entities;
  }
}
