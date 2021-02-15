import { createElement, Fragment } from '@gera2ld/jsx-dom';

export { createElement, Fragment };

const NS_HTML = 'http://www.w3.org/1999/xhtml';

createElement.createElement = (tag: string) => document.createElementNS(NS_HTML, tag);

/**
 * Return all elements that match the given `xpath` as an array.
 */
export function getElementsByXPath(xpath: string, context = document) {
  const iterator = document.evaluate(xpath, context, null, XPathResult.ANY_TYPE, null);
  const result: Node[] = [];
  let item: Node;
  while ((item = iterator.iterateNext())) {
    result.push(item);
  }
  return result;
}

/**
 * Walk a node tree and return all text contents in an array.
 */
export function getTextValues(node: HTMLElement) {
  if (node.nodeType === Node.TEXT_NODE) return [node.nodeValue];
  if (node.nodeType === Node.ELEMENT_NODE && !['script', 'style'].includes(node.tagName.toLowerCase())) {
    return Array.from(node.childNodes).flatMap(getTextValues);
  }
  return [];
}

/**
 * Observe an existing `node` until `callback` returns `true`.
 * The returned function can be called explicitly to disconnect the observer.
 *
 * ```js
 * VM.observe(document.body, () => {
 *   const node = document.querySelector('.profile');
 *   if (node) {
 *     console.log('It\'s there!');
 *     return true;
 *   }
 * });
 * ```
 */
export function observe(
  node: Node,
  callback: (mutations: MutationRecord[], observer: MutationObserver) => boolean,
  options?: any,
): () => void {
  let disconnect: () => void;
  const observer = new MutationObserver((mutations, ob) => {
    const result = callback(mutations, ob);
    if (result) disconnect();
  });
  observer.observe(node, {
    childList: true,
    subtree: true,
    ...options,
  });
  disconnect = () => observer.disconnect();
  return disconnect;
}
