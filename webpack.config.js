const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PRODUCTION = process.env.NODE_ENV === "production";
module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Adds CSS to the DOM by injecting a <style> tag
          'css-loader',   // Interprets @import and url() like import/require() and will resolve them
          'sass-loader'   // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            // options: {
            //   name: '[name].[ext]',
            // },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      "proccess.env.PRODUCTION": JSON.stringify(PRODUCTION),
      "proccess.env.DEVELOPMENT": JSON.stringify(DEVELOPMENT),
  }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/images', to: 'images' }, // Copy images from public/images to dist/images
        { from: 'public/icons', to: 'icons' }, 
        { from: 'public', to: 'dist' },   // Copy icons from public/ to dist/
      ],
    }),
    new HtmlWebpackPlugin({
      baseUrl: '/',
      template: './public/index.html',
      templateParameters(compilation, assets, options) {
        return {
          compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options,
          },
          process,
        }
      },
      chunksSortMode: 'auto',
      minify: {
        collapseWhitespace: false,
      },
      cache: true,
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 4000,
        server: { baseDir: ['dist'] },
        files: ['dist/**/*'],
        open: true,
      },
      {
        reload: false,
      }
    ),
  ],
  devServer: {
    static: './dist', // Set the static directory
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
