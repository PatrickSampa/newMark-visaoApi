export class RequestUrlPaginaDosprev {
  async execute(documento_id: number) {
    return `https://supersapiensbackend.agu.gov.br/v1/administrativo/componente_digital/${documento_id}/download?context=%7B%7D`;
  }
}
