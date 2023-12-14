const path = require('path');
const ReactRefreshWebpackPlugin=require("@pmmmwh/react-refresh-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
const webpack = require('webpack');

// Environment setup
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isProduction = mode === 'production';
const isDevelopment = !isProduction;

// Babel plugins based on environment
const isDevPlugin = ['react-refresh/babel'];

const isProdPlugin = [
  '@babel/plugin-transform-block-scoping',
  'transform-remove-console',
  'babel-plugin-transform-remove-undefined',
  ['transform-react-remove-prop-types', { mode: 'wrap', ignoreFilenames: ['node_modules'] }]
];

const isProdDevPlugin = [
  '@babel/plugin-transform-async-to-generator',
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-transform-runtime', { corejs: 3, useESModules: true }],
  // ['styled-jsx/babel', { optimizeForSpeed: true }]
];

const isPlugins = process.env.NODE_ENV !== 'production' ? isDevPlugin : isProdPlugin;
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  mode,
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/js/[name].[contenthash:8].js',
    publicPath: '/',
    clean: true,
    assetModuleFilename: 'assets/[name].[hash][ext]',
  },
  devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  ignoreWarnings: [
          // Ignore warnings from third-party libraries in node_modules
          {
            module: /node_modules/,
          },
          // Ignore warnings with common keywords in the message
          {
            message: /deprecated|warning|error|info/,
          },
          /warning from compiler/,
          (warning) => false,
        ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [...isProdDevPlugin, ...isPlugins],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new Dotenv(),
    new WorkerPlugin(),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/images', to: 'images' },
        { from: 'public/icons', to: 'icons' },
        { from: 'public', to: 'build' },
      ],
    }),
    isProduction && new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isProduction &&new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify('production')
  }),
  isDevelopment &&new webpack.DefinePlugin({
    'process.env.NODE_ENV' : JSON.stringify('development')
})
  ].filter(Boolean),
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserWebpackPlugin()],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxInitialRequests: 10,
      maxAsyncRequests: 10,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
        },
        common: {
          minChunks: 2,
          priority: -20,
        },
      },
    },
    runtimeChunk: 'single',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watch: true,
};

