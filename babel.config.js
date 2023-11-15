/* eslint-disable unicorn/prefer-module */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.ios.js', '.android.js'],
        alias: {
          '@app': './src',
        },
      },
    ],
    'jest-hoist',
  ],
};
