export async function CalculeDate(dateInicial: string, dateFinal: string) {
  const newDateInicial = new Date(dateInicial);
  const newDateFinal = new Date(dateFinal);

  return newDateFinal.getDate() - newDateInicial.getDate();
}
