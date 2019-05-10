module.exports = {
  extends: require.resolve('@gera2ld/plaid/config/babelrc-base'),
  presets: [
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '#': './src',
      },
    }],
  ].filter(Boolean),
};
