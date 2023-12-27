export function convertToDate(dateString: string) {
  const [year, month, day] = dateString.split('-');
  return new Date(`${year}-${month}-${day}`);
}
