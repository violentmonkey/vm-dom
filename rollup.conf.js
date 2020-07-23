const { getRollupPlugins, getRollupExternal, defaultOptions, rollupMinify } = require('@gera2ld/plaid');
const pkg = require('./package.json');

const DIST = defaultOptions.distDir;
const FILENAME = 'index';
const BANNER = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} License */`;

const external = getRollupExternal();
const rollupConfig = [
  {
    input: {
      input: 'src/index.js',
      plugins: getRollupPlugins({ esm: true }),
    },
    output: {
      format: 'iife',
      file: `${DIST}/${FILENAME}.js`,
      name: 'VM',
      extend: true,
      esModule: false,
    },
    minify: true,
  },
];
// Generate minified versions
rollupConfig.filter(({ minify }) => minify)
.forEach(config => {
  rollupConfig.push(rollupMinify(config));
});

rollupConfig.forEach((item) => {
  item.output = {
    indent: false,
    // If set to false, circular dependencies and live bindings for external imports won't work
    externalLiveBindings: false,
    ...item.output,
    ...BANNER && {
      banner: BANNER,
    },
  };
});

module.exports = rollupConfig.map(({ input, output }) => ({
  ...input,
  output,
}));
