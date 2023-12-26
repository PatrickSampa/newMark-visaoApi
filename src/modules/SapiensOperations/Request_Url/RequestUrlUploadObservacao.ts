export class RequestUrlObservacao {
  async execute(user_id: string) {
    return `https://supersapiensbackend.agu.gov.br/v1/administrativo/tarefa/${user_id}?populate=%5B%5D&context=%7B%7D`;
  }
}
