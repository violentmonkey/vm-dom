VM.createElement
---

![NPM](https://img.shields.io/npm/v/vm.jsx.svg)
![License](https://img.shields.io/npm/l/vm.jsx.svg)

Use JSX for HTML elements.

Usage
---

1. Use in a userscript:

   ```js
   // ...
   // @require https://unpkg.com/vm.jsx
   // ...

   document.body.appendChild(VM.createElement('div', {}, 'hello'));
   ```

1. Use with Babel:

   ```sh
   $ yarn add vm.jsx
   # ESLint
   $ yarn add eslint-plugin-react -D
   ```

   ```js
   import VM from 'vm.jsx';
   const h = VM.createElement;

   document.body.appendChild(<div>hello</div>);
   ```

   ```js
   // .babelrc
   {
     // ...
     "plugins": [
       ["@babel/plugin-transform-react-jsx", {
         "pragma": "h",
       }],
     ],
   }
   ```

   ```js
   // .eslintrc.js
   module.exports = {
     plugins: [
       // ...
       'react',
     ],
     rules: {
       // ...
       'react/jsx-uses-react': 'error',
     },
     settings: {
       react: {
         pragma: 'h',
       },
     },
   };
   ```
