const { inDev } = require('./webpack.helpers');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [inDev() && require.resolve('react-refresh/babel')].filter(
            Boolean,
          ),
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            [
              'module-resolver',
              {
                extensions: ['.js', '.jsx', '.json', 'ts', 'tsx'],
                root: ['./src'],
                alias: {
                  '@shared/common': '../../shared/common',
                  '@shared/common/*': '../../shared/common/*',
                  //updates,
                  '@shared/front': '../../shared/front',
                  '@shared/front/*': '../../shared/front/*',
                  '@shared/web': '../../shared/web',
                  '@shared/web/*': '../../shared/web/*',
                  '@types': '../../types/',
                },
              },
            ],
          ],
        },
      },
    ],
  },
  {
    // CSS Loader
    test: /\.css$/,
    use: [
      { loader: inDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
    ],
  },
  {
    // SCSS (SASS) Loader
    test: /\.s[ac]ss$/i,
    use: [
      { loader: inDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
      { loader: 'sass-loader' },
    ],
  },
  {
    // Less loader
    test: /\.less$/,
    use: [
      { loader: inDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
      { loader: 'less-loader' },
    ],
  },
  {
    // Assets loader
    // More information here https://webpack.js.org/guides/asset-modules/
    test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
    type: 'asset',
    generator: {
      filename: 'assets/[hash][ext][query]',
    },
  },
];
