import { createElement, Fragment } from '@gera2ld/jsx-dom';

export { createElement, Fragment };

const NS_HTML = 'http://www.w3.org/1999/xhtml';

createElement.createElement = (tag: string) => document.createElementNS(NS_HTML, tag);

export function getElementsByXPath(xpath: string, context = document) {
  const iterator = document.evaluate(xpath, context, null, XPathResult.ANY_TYPE, null);
  const result: Node[] = [];
  let item: Node;
  while ((item = iterator.iterateNext())) {
    result.push(item);
  }
  return result;
}

export function getTextValues(node: HTMLElement) {
  if (node.nodeType === Node.TEXT_NODE) return [node.nodeValue];
  if (node.nodeType === Node.ELEMENT_NODE && !['script', 'style'].includes(node.tagName.toLowerCase())) {
    return Array.from(node.childNodes).flatMap(getTextValues);
  }
  return [];
}

export function observe(
  node: Node,
  callback: (mutations: MutationRecord[], observer: MutationObserver) => boolean,
  options?: any,
) {
  let revoke: () => void;
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
