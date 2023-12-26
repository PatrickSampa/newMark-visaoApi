import { Buffer } from 'buffer';

export function decodeBase64FileWithHash(base64Data: any): any {
  return Buffer.from(base64Data, 'base64').toString('utf8');
}
