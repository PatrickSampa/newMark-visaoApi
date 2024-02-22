import { nfd } from 'unorm';

export function removerAcentos(texto: string): string {
  // Normaliza a string para NFD, separando os acentos

  return nfd(texto).replace(/[\u0300-\u036f]/g, '');
}
