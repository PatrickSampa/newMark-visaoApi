export function encontrarEVerificarTamanho(
  texto: string,
  stringParaProcurar: string,
  //tamanhoEsperado: number,
): void {
  // Buscar a string alvo no texto
  if (texto.includes(stringParaProcurar)) {
    const textoDepois = texto.slice(
      texto.indexOf(stringParaProcurar) + stringParaProcurar.length + 1,
    );
    console.log('depois ' + textoDepois); // ""
  } else {
    console.log('A string não foi encontrada.');
  }
}
