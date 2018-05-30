VM.createElement
---

[![NPM](https://img.shields.io/npm/v/vm.jsx.svg)](https://npm.im/vm.jsx)
![License](https://img.shields.io/npm/l/vm.jsx.svg)

Use JSX for HTML elements.

Based on [@gera2ld/jsx-dom](https://github.com/gera2ld/jsx-dom).

Usage
---

Use in a userscript:

```js
// ...
// @require https://unpkg.com/vm.jsx
// ...

document.body.appendChild(VM.createElement('div', {}, 'hello'));
```
