import { Buffer } from 'buffer';

export async function decodeBase64FileWithHash(base64Data: any): Promise<any> {
  return Buffer.from(base64Data, 'base64').toString('utf8');
}
