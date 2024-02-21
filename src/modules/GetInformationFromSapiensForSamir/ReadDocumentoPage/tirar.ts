export function removerAcentos(texto: string): string {
  // Normaliza a string para NFD, separando os acentos
  console.log('text' + texto);
  return texto
    .replace(/[áàãâä]/gi, 'a')
    .replace(/[éèêë]/gi, 'e')
    .replace(/[íìîï]/gi, 'i')
    .replace(/[óòõôö]/gi, 'o')
    .replace(/[úùûü]/gi, 'u')
    .replace(/[ç]/gi, 'c')
    .replace(/[^a-z0-9]/gi, '');
}
