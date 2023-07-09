const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./src/index.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/',
  },
  plugins: require('./webpack.plugins'),
  resolve: {
    modules: [path.resolve('./node_modules')],
    alias: require('./webpack.aliases'),
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  stats: 'errors-warnings',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    sideEffects: true,
    concatenateModules: true,
    usedExports: true,
    runtimeChunk: 'multiple',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
};
