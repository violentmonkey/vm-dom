# VM.createElement

[![NPM](https://img.shields.io/npm/v/@violentmonkey/dom.svg)](https://npm.im/@violentmonkey/dom)
![License](https://img.shields.io/npm/l/@violentmonkey/dom.svg)

Use JSX for HTML elements.

Based on [@gera2ld/jsx-dom](https://github.com/gera2ld/jsx-dom).

## Usage

First, include `@violentmonkey/dom` as a dependency:

```js
// ...
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// ...
```

Then you can use `VM.createElement` directly:

```js
document.body.appendChild(VM.createElement('div', {}, 'hello'));
```

Or use with JSX and bundlers, for example:

```js
// .babelrc.js
{
  plugins: [
    '@babel/plugin-transform-react-jsx',
  ],
}
```

```js
const React = VM;

document.body.appendChild(<div>hello</div>);
```

To initialize a project for userscript with JSX support, try [generator-rollup](https://github.com/gera2ld/generator-rollup):

```sh
$ mkdir project
$ cd project
$ npx -p https://github.com/gera2ld/generator-rollup.git -p yo yo @gera2ld/rollup:iife
```

## API

### VM.createElement

`VM.createElement(tag, props, ...children)`

### VM.Fragment
