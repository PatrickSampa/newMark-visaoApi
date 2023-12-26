import { ResponseFolder } from '../../SapiensOperations/Response/ResponseFolder';

export function coletarCitacao(
  arrayDeDocumentos: ResponseFolder,
): string | null {
  const ObjectCitacao = arrayDeDocumentos.find(
    (Documento) => Documento.documento.tipoDocumento.nome == 'CITAÇÃO',
  );
  if (ObjectCitacao == null) {
    return null;
  }
  const ArrayDataCitacaoParaFormatacao =
    ObjectCitacao.documento.dataHoraProducao.split(' ')[0].split('-');
  const dataCitacao: string = `${
    ArrayDataCitacaoParaFormatacao[2].split('T')[0]
  }/${ArrayDataCitacaoParaFormatacao[1]}/${ArrayDataCitacaoParaFormatacao[0]}`;
  return dataCitacao;
}
