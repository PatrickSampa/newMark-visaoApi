export async function filtePdf(data: string) {
  return data.split('/FlateDecode>>\nstream');
}
