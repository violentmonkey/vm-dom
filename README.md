# @violentmonkey/dom

[![NPM](https://img.shields.io/npm/v/@violentmonkey/dom.svg)](https://npm.im/@violentmonkey/dom)
![License](https://img.shields.io/npm/l/@violentmonkey/dom.svg)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/@violentmonkey/dom)

Use JSX for HTML elements.

Based on [@gera2ld/jsx-dom](https://github.com/gera2ld/jsx-dom).

## What is it?

This library is just a light wrapper around `document.createElement`. So we can easily create DOM elements using JSX with the help of this library instead of writing tedious imperative code.

## When should we NOT use it?

You should NOT use it when you use a library that has its own implementation of JSX, such as React, Vue, Svelte, SolidJS, etc. The JSX syntaxes are incompatible and using them together will cause unexpected issues.

You don't need it if you initialize a userscript project with [generator-userscript](https://github.com/violentmonkey/generator-userscript), which uses [solid-js](https://solidjs.com/).

However, you can still use methods like `VM.h` directly **without using JSX** to make the code shorter.

## Usage

First, include `@violentmonkey/dom` as a dependency:

```js
// ...
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ...
```

Then you can use `VM.h` (similar to `React.createElement`) and `VM.m` (for `mount`ing as DOM elements) directly.

There is also a `VM.hm` for `VM.h` plus `VM.m` if you don't need SVG support and want to get rid of `VM.m`.

```js
const vdom = VM.h('div', {}, 'hello');
const el = VM.m(vdom); // -> HTMLDivElement

// or
const el = VM.hm('div', {}, 'hello'); // -> HTMLDivElement

document.body.appendChild(el);
```

Or use with JSX and bundlers, for example:

```js
// .babelrc.js
{
  plugins: [
    // JSX
    ['@babel/plugin-transform-react-jsx', {
      pragma: 'VM.h', // or 'VM.hm' if you don't need SVG support and want to get rid of 'VM.m'
      pragmaFrag: 'VM.Fragment',
    }],
  ],
}
```

```js
// pragma: VM.h
document.body.appendChild(VM.m(<div>hello</div>));

// pragma: VM.hm
document.body.appendChild(<div>hello</div>);
```

## API

See [![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/@violentmonkey/dom).
