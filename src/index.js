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

export function observe(node, callback, options) {
  let revoke;
  const observer = new MutationObserver((mutations, ob) => {
    const result = callback(mutations, ob);
    if (result) revoke();
  });
  observer.observe(node, {
    childList: true,
    subtree: true,
    ...options,
  });
  revoke = () => observer.disconnect();
  return revoke;
}

export { createElement, Fragment };
