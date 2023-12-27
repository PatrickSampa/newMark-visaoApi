//import { parse } from 'date-fns';
export function verificarQuantosDiasDocumentExpi(
  date: Date,
  dias: number,
): number {
  //Exemplo: dosprev = * "Informações extraídas dos sistemas informatizados do INSS em: 10/08/2022 11:58:28"
  //Obtendo somente a data em string

  // Converter a string para um objeto Date

  // Calcular a diferença entre a data fornecida e a data atual em milisegundos
  const difference = Date.now() - date.getTime();

  // Converter a diferença de milisegundos para dias
  const differenceInDays = difference / (1000 * 60 * 60 * 24);

  return dias - Math.floor(differenceInDays);
}
