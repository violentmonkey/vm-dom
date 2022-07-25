export {
  h, createElement, Fragment, mountDom, mountDom as m, hm,
} from '@gera2ld/jsx-dom';

if (typeof VM === 'object') {
  VM.versions = Object.assign({}, VM.versions, {
    dom: 'process.env.VERSION',
  });
}

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
  options?: MutationObserverInit,
): () => void {
  const observer = new MutationObserver((mutations, ob) => {
    const result = callback(mutations, ob);
    if (result) disconnect();
  });
  observer.observe(node, Object.assign({
    childList: true,
    subtree: true,
  }, options));
  const disconnect = () => observer.disconnect();
  return disconnect;
}
