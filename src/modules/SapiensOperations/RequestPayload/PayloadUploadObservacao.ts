import { CalculeDate } from '../../../Help/CalculoComDate';
import { ResponseProcess } from '../Response/ResponseProcess';

export class PayloadUploadObservacao {
  async execute(data: ResponseProcess, observacao: string) {
    return `
    {
        "postIt": null,
        "urgente": false,
        "observacao": "${observacao}",
        "localEvento": null,
        "dataHoraInicioPrazo": "${data[0].dataHoraInicioPrazo}",
        "dataHoraFinalPrazo": "${data[0].dataHoraFinalPrazo}",
        "dataHoraLeitura": "${data[0].dataHoraLeitura}",
        "dataHoraDistribuicao": null,
        "processo": ${data[0].processo.id},
        "especieTarefa": ${data[0].especieTarefa.id},
        "usuarioResponsavel": ${data[0].usuarioResponsavel.id},
        "setorOrigem": ${data[0].setorOrigem.id},
        "setorResponsavel": ${data[0].setorResponsavel.id},
        "distribuicaoAutomatica": ${data[0].distribuicaoAutomatica},
        "folder": null,
        "isRelevante": ${data[0].isRelevante},
        "@type": "Tarefa",
        "@id": "/v1/administrativo/tarefa/${data[0].id}",
        "@context": "/api/doc/#model-Tarefa",
        "locked": ${data[0].locked},
        "diasUteis": null,
        "prazoDias": ${await CalculeDate(
          data[0].dataHoraInicioPrazo,
          data[0].dataHoraFinalPrazo,
        )},
        "blocoProcessos": null,
        "processos": null,
        "blocoResponsaveis": null,
        "grupoContato": null,
        "usuarios": null,
        "setores": null
      }`;
  }
}
