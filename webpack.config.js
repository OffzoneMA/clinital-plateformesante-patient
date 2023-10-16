// const { resolve } = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
// const DEVELOPMENT = process.env.NODE_ENV === "development";
// const PRODUCTION = process.env.NODE_ENV === "production";
// module.exports = {
//   entry: './src/index.jsx',
//   output: {
//     filename: 'bundle.js',
//     path: resolve(__dirname, 'dist'),
//     publicPath: '/',
//   },
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           'style-loader', // Adds CSS to the DOM by injecting a <style> tag
//           'css-loader',   // Interprets @import and url() like import/require() and will resolve them
//           'sass-loader'   // Compiles Sass to CSS
//         ],
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/i,
//         use: [
//           {
//             loader: 'file-loader',
//             // options: {
//             //   name: '[name].[ext]',
//             // },
//           },
//         ],
//       },
//     ],
//   },
//   plugins: [
//     new Dotenv(),
//     new webpack.DefinePlugin({
//       "proccess.env.PRODUCTION": JSON.stringify(PRODUCTION),
//       "proccess.env.DEVELOPMENT": JSON.stringify(DEVELOPMENT),
//   }),
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: 'public/images', to: 'images' }, // Copy images from public/images to dist/images
//         { from: 'public/icons', to: 'icons' }, 
//         { from: 'public', to: 'dist' },   // Copy icons from public/ to dist/
//       ],
//     }),
//     new HtmlWebpackPlugin({
//       baseUrl: '/',
//       template: './public/index.html',
//       templateParameters(compilation, assets, options) {
//         return {
//           compilation,
//           webpack: compilation.getStats().toJson(),
//           webpackConfig: compilation.options,
//           htmlWebpackPlugin: {
//             files: assets,
//             options,
//           },
//           process,
//         }
//       },
//       chunksSortMode: 'auto',
//       minify: {
//         collapseWhitespace: false,
//       },
//       cache: true,
//     }),
//     new BrowserSyncPlugin(
//       {
//         host: 'localhost',
//         port: 4000,
//         server: { baseDir: ['dist'] },
//         files: ['dist/**/*'],
//         open: true,
//       },
//       {
//         reload: false,
//       }
//     ),
//   ],
//   devServer: {
//     static: './dist', // Set the static directory
//     hot: true,
//     before: (app) => {
//       // Set the proper Content-Type header for JavaScript files
//       app.get('/browser-sync/browser-sync-client.2.12.5.js', (req, res) => {
//         res.setHeader('Content-Type', 'application/javascript');
//       });
//     },
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   }
// };
const path = require("path");
    const webpack = require("webpack");
    const { merge } = require("webpack-merge");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const modeConfiguration = env => require(`./build-utils/webpack.${env}`)(env);
    
    module.exports = ({ mode } = { mode: "production" }) => {
        console.log(`mode is: ${mode}`);
    
        return merge(
            {
                mode,
                entry: "./src/index.jsx",
                devServer: {
                    hot: true,
                    open: true
                },
                resolve: {
                  extensions: ['.js', '.jsx']
                },
                output: {
                    publicPath: "/",
                    path: path.resolve(__dirname, "build"),
                    filename: "bundle.js"
                },
                module: {
                    rules: [
                        {
                            test: /\.(js|jsx)$/,
                            exclude: /node_modules/,
                            loader: "babel-loader"
                        },
                              {
                                test: /\.(png|jpe?g|gif|svg)$/i,
                                use: [
                                  {
                                    loader: 'file-loader',
                                    options: {
                                      name: '[name].[ext]',
                                    },
                                  },
                                ],
                              },
                              { 
                                test: /\.css?$/,
                                use: [
                                  { loader: "style-loader" },
                                  { loader: "css-loader" },
                                ]
                              },
                              {
                                test: /\.scss$/,
                                use: [
                                  { loader: "style-loader" },
                                  { loader: "css-loader" },
                                  { loader: "sass-loader" }
                                ]
                              },
                    ]
                },
                plugins: [
                    new HtmlWebpackPlugin({
                        template: "./public/index.html"
                    }),
                    new webpack.HotModuleReplacementPlugin()
                ]
            },
            // modeConfiguration(mode)
        );
    };