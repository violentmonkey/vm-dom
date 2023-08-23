import plaid from '@gera2ld/plaid';
import pkg from './package.json' assert { type: 'json' };

const { defaultOptions, getRollupExternal, getRollupPlugins } = plaid;

const DIST = defaultOptions.distDir;
const BANNER = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} License */`;

const external = getRollupExternal();
const bundleOptions = {
  extend: true,
  esModule: false,
};
const postcssOptions = {
  inject: false,
  minimize: true,
};
const rollupConfig = [
  {
    input: 'src/index.ts',
    plugins: getRollupPlugins({
      esm: true,
      extensions: defaultOptions.extensions,
      postcss: postcssOptions,
    }),
    external,
    output: {
      format: 'esm',
      file: `${DIST}/index.mjs`,
    },
  },
  {
    input: 'src/index.ts',
    plugins: getRollupPlugins({
      esm: true,
      extensions: defaultOptions.extensions,
      postcss: postcssOptions,
    }),
    output: {
      format: 'iife',
      file: `${DIST}/index.js`,
      name: 'VM',
      ...bundleOptions,
    },
  },
  {
    input: 'src/solid.ts',
    plugins: getRollupPlugins({
      esm: true,
      extensions: defaultOptions.extensions,
      postcss: postcssOptions,
    }),
    output: {
      format: 'iife',
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

export default rollupConfig;
