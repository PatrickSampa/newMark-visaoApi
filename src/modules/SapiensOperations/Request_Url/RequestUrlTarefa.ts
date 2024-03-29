export class RequestUrlTarefa {
  async execute(
    user_id: string,
    observacao_sapiens: string,
    typeSearch: string,
  ) {
    return `https://supersapiensbackend.agu.gov.br/v1/administrativo/tarefa?where=%7B%22usuarioResponsavel.id%22:%22eq:${user_id}%22,%22dataHoraConclusaoPrazo%22:%22isNull%22,%22especieTarefa.generoTarefa.nome%22:%22eq:${typeSearch.toUpperCase()}%22,%22folder.id%22:%22isNull%22,%22andX%22:%5B%7B%22observacao%22:%22like:%25${observacao_sapiens}%25%22%7D%5D%7D&limit=50&offset=0&order=%7B%7D&populate=%5B%22processo%22,%22setor.especieSetor%22,%22setor.generoSetor%22,%22setor.parent%22,%22setor.unidade%22,%22processo.especieProcesso%22,%22processo.especieProcesso.generoProcesso%22,%22processo.modalidadeMeio%22,%22processo.documentoAvulsoOrigem%22,%22especieTarefa%22,%22usuarioResponsavel%22,%22setorResponsavel%22,%22setorResponsavel.unidade%22,%22setorOrigem%22,%22setorOrigem.unidade%22,%22especieTarefa.generoTarefa%22,%22vinculacoesEtiquetas%22,%22vinculacoesEtiquetas.etiqueta%22,%22vinculacaoWorkflow%22,%22vinculacaoWorkflow.workflow%22,%22criadoPor%22,%22atualizadoPor%22,%22apagadoPor%22,%22folder%22%5D&context=%7B%22modulo%22:%22administrativo%22%7D`;
  }
}
//ADMINISTRATIVO
//JUDICIAL
