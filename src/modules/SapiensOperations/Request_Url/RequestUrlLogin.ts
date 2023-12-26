export class RequestUrlLogin {
  async handle(): Promise<string> {
    return 'https://supersapiensbackend.agu.gov.br/auth/ldap_get_token';
  }
}
