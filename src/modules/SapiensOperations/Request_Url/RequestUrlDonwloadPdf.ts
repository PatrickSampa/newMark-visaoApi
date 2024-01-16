export class RequestUrlDonwloadPdf {
  async execute(id: string) {
    return `https://supersapiensbackend.agu.gov.br/v1/administrativo/componente_digital/${id}/download?context=%7B%7D`;
  }
}
