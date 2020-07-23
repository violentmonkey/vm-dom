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

export function getTextValues(node) {
  if (node.nodeType === HTMLElement.TEXT_NODE) return [node.nodeValue];
  if (node.nodeType === HTMLElement.ELEMENT_NODE && !['script', 'style'].includes(node.tagName.toLowerCase())) {
    return Array.from(node.childNodes).flatMap(getTextValues);
  }
  return [];
}

export { createElement, Fragment };
