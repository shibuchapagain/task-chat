const webpack = require('webpack');
const { inDev } = require('./webpack.helpers');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

module.exports = [
  new NodePolyfillPlugin(),
  new Dotenv(),
  new HtmlWebpackPlugin({
    template: 'index.html',
    favicon: 'public/favicon.ico',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash].css',
    chunkFilename: '[name].[chunkhash].chunk.css',
  }),
  ...(inDev()
    ? [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin({ overlay: false }),
      ]
    : [
        new CopyPlugin({
          patterns: [{ from: 'public' }],
        }),
        new CompressionPlugin({
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      ]),
].filter(Boolean);
