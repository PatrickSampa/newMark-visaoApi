export function correçaoDoErroDeFormatoDoSapiens(
  texto: string | null,
): string | null {
  if (texto == null) {
    return null;
  }
  return texto.replace(/\s+/g, '');
}
