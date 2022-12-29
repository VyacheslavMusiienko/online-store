const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCSSExtractPlugin.loader,
      options: {},
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const baseConfig = {
  entry: {
    index: path.resolve(__dirname, './src/index'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      { test: /\.ts$/i, use: 'ts-loader', include: [path.resolve(__dirname, 'src')] },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    hashFunction: 'sha256',
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
    new EslintPlugin({ extensions: 'ts' }),
    new CopyWebPackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/assets/image'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
