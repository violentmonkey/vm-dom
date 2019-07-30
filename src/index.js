import { createElement, Fragment } from '@gera2ld/jsx-dom';

const NS_HTML = 'http://www.w3.org/1999/xhtml';

createElement.createElement = tag => document.createElementNS(NS_HTML, tag);

export { createElement, Fragment };
