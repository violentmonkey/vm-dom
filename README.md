# @violentmonkey/dom

[![NPM](https://img.shields.io/npm/v/@violentmonkey/dom.svg)](https://npm.im/@violentmonkey/dom)
![License](https://img.shields.io/npm/l/@violentmonkey/dom.svg)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/@violentmonkey/dom)

Use JSX for HTML elements.

Based on [@gera2ld/jsx-dom](https://github.com/gera2ld/jsx-dom).

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

To initialize a project for userscript with JSX support, try [generator-userscript](https://github.com/violentmonkey/generator-userscript):

```sh
$ mkdir my-script
$ cd my-script
$ npx -p https://github.com/violentmonkey/generator-userscript.git -p yo yo @violentmonkey/userscript
```

## API

See [![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/@violentmonkey/dom).
