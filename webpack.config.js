const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  externals: [nodeExternals({
    modulesFromFile: true,
  })], // in order to ignore all modules in package.json when bundling
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  output: {
    filename: 'owi-edge.js',
    library: 'owiEdge',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
  },
  target: 'node',
};
