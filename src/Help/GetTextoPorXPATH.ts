const xpath = require('xpath');

export function getXPathText(
  html: any,
  xpathExpression: string,
): string | null {
  const dom = html;
  const XPathResult = xpath.XPathResult;
  const nodes = dom.window.document.evaluate(
    xpathExpression,
    dom.window.document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );
  const textoDoXpathNaoExiste = nodes.singleNodeValue == null;
  if (textoDoXpathNaoExiste) {
    //console.log("Falha ao pegar xpath", nodes);
    // console.log("xpath", xpathExpression);
    return null;
  }
  return nodes.singleNodeValue.textContent;
}
