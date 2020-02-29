import { createElement, Fragment } from '@gera2ld/jsx-dom';

const NS_HTML = 'http://www.w3.org/1999/xhtml';

createElement.createElement = tag => document.createElementNS(NS_HTML, tag);

export function getElementsByXPath(xpath, context = document) {
  const iterator = document.evaluate(xpath, context, null, XPathResult.ANY_TYPE, null);
  const result = [];
  let item;
  while ((item = iterator.iterateNext())) {
    result.push(item);
  }
  return result;
}

export function getTextValues(root) {
  const texts = [];
  const nodes = [root];
  while (nodes.length) {
    const node = nodes.shift();
    if (node.nodeType === HTMLElement.TEXT_NODE) {
      texts.push(node.nodeValue);
    } else if (node.nodeType === HTMLElement.ELEMENT_NODE) {
      if (!['script', 'style'].includes(node.tagName.toLowerCase())) {
        nodes.push(...node.childNodes);
      }
    }
  }
  return texts;
}

export { createElement, Fragment };
