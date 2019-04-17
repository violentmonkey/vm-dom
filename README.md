# VM.createElement

[![NPM](https://img.shields.io/npm/v/@violentmonkey/dom.svg)](https://npm.im/@violentmonkey/dom)
![License](https://img.shields.io/npm/l/@violentmonkey/dom.svg)

Use JSX for HTML elements.

Based on [@gera2ld/jsx-dom](https://github.com/gera2ld/jsx-dom).

## Usage

Use in a userscript:

```js
// ...
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// ...

document.body.appendChild(VM.createElement('div', {}, 'hello'));
```

This script can be used with JSX and bundlers, for example:

```js
// .babelrc.js
{
  plugins: [
    ['@babel/plugin-transform-react-jsx', {
      pragma: 'h',
    }],
  ],
}
```

```js
// ...
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// ...

const h = VM.createElement;

document.body.appendChild(<div>hello</div>);
```

To initialize a project for userscript with JSX support, try [generator-rollup](https://github.com/gera2ld/generator-rollup):

```sh
$ mkdir project
$ cd project
$ npx -p https://github.com/gera2ld/generator-rollup.git -p yo yo @gera2ld/rollup:iife
```
