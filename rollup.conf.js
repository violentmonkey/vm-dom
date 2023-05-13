const {
  defaultOptions,
  getRollupExternal,
  getRollupPlugins,
  loadConfigSync,
} = require('@gera2ld/plaid');
const pkg = require('./package.json');

const DIST = defaultOptions.distDir;
const BANNER = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} License */`;

const external = getRollupExternal();
const bundleOptions = {
  extend: true,
  esModule: false,
};
const postcssOptions = {
  ...require('@gera2ld/plaid/config/postcssrc'),
  inject: false,
  minimize: true,
};
const rollupConfig = [
  {
    input: {
      input: 'src/index.ts',
      plugins: getRollupPlugins({
        esm: true,
        extensions: defaultOptions.extensions,
        postcss: postcssOptions,
      }),
      external,
    },
    output: {
      format: 'esm',
      file: `${DIST}/index.mjs`,
    },
  },
  {
    input: {
      input: 'src/index.ts',
      plugins: getRollupPlugins({
        esm: true,
        extensions: defaultOptions.extensions,
        postcss: postcssOptions,
      }),
    },
    output: {
      format: 'umd',
      file: `${DIST}/index.js`,
      name: 'VM',
      ...bundleOptions,
    },
  },
  {
    input: {
      input: 'src/solid.ts',
      plugins: getRollupPlugins({
        esm: true,
        extensions: defaultOptions.extensions,
        postcss: postcssOptions,
      }),
    },
    output: {
      format: 'umd',
      file: `${DIST}/solid.js`,
      name: 'VM.solid',
      ...bundleOptions,
    },
  },
];

rollupConfig.forEach((item) => {
  item.output = {
    indent: false,
    // If set to false, circular dependencies and live bindings for external imports won't work
    externalLiveBindings: false,
    ...item.output,
    ...(BANNER && {
      banner: BANNER,
    }),
  };
});

module.exports = rollupConfig.map(({ input, output }) => ({
  ...input,
  output,
}));
