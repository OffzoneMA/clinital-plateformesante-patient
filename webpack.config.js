// const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin=require("@pmmmwh/react-refresh-webpack-plugin")
// const webpack = require("webpack");
// const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// module.exports = function(_env, argv) {
//   const isProduction = argv.mode === "production";
//   const isDevelopment = !isProduction;

//   return {
//     devtool: isDevelopment && "cheap-module-source-map",
//     entry: "./src/index.jsx",
//     context: path.resolve(__dirname),
//     output: {
//       path: path.resolve(__dirname, "build"),
//       filename: "assets/js/[name].[contenthash:8].js",
//       publicPath: "/"
//     },
//     ignoreWarnings: [
//       // Ignore warnings from third-party libraries in node_modules
//       {
//         module: /node_modules/,
//       },
//       // Ignore warnings with common keywords in the message
//       {
//         message: /deprecated|warning|error|info/,
//       },
//       /warning from compiler/,
//       (warning) => true,
//     ],
//     module: {
//       rules: [
//         {
//           test: /\.jsx?$/,
//           exclude: /node_modules/,
//           use: {
//             loader: "babel-loader",
//             options: {
//               cacheDirectory: true,
//               cacheCompression: false,
//               envName: isProduction ? "production" : "development",
//             },
//           },
//         },{
//                 test: /\.(sa|sc|c)ss$/,
//                 use: [ {
//                         loader: "css-loader",
//                     },
//                     {loader:'style-loader'},
//                     {loader: 'resolve-url-loader'
//                               },
//                     {
//                         loader: "postcss-loader",
//                         options: {
//                             sourceMap: true
//                         },
//                     },
//                     {
//                         loader: "sass-loader",
//                         options: {
//                             sourceMap: true,
//                             implementation: require("sass"),
//                             sassOptions: {
//                                 quietDeps: true,
//                               },
//                         }
//                     }
//                 ]
//             },
//         {
//             test: /\.css$/,
//             use: [
//                 {loader:'style-loader'},
//               {
//                 loader: 'css-loader',
//                 options: {
//                   sourceMap: true
//                 }
//               },
//               {
//                 loader: 'resolve-url-loader'
//               },
//               {
//                 loader: "sass-loader",
//                 options: {
//                   sassOptions: {
//                     quietDeps: true,
//                   },
//                 },
//               },
//             ]
//           },
//         {
//           test: /\.(png|jpg|gif)$/i,
//           use: {
//             loader: "url-loader",
//             options: {
//               limit: 8192000,
//               name: "assets/media/[name].[hash:8].[ext]",
//             },
//           },
//         },
//         {
//           test: /\.svg$/,
//           use: ["react-svg-loader"],
//         },{
//             test: /\.css$/i,
//             use: ['style-loader', 'css-loader'],
//           },
//           {
//             test: /\.(woff|woff2|eot|ttf|otf)$/i,
//             type: 'asset/resource',
//           },
//       ],
//     },
//     resolve: {
//       extensions: [".js", ".jsx"],
//     },
//     plugins: [
//       //isProduction &&
//         new MiniCssExtractPlugin({
//           filename: "assets/css/[name].[contenthash:8].css",
//           chunkFilename: "assets/css/[name].[contenthash:8].chunk.css",
//         }),
//       new Dotenv(),
//       isProduction &&
//         new CopyWebpackPlugin({
//           patterns: [
//             { from: 'public/images', to: 'images' },
//             { from: 'public/icons', to: 'icons' },
//             { from: 'public', to: 'build' },
//           ],
//         }),
//       new HtmlWebpackPlugin({
//         template: path.resolve(__dirname, "public/index.html"),
//         inject: true,
//       }),
//       new webpack.DefinePlugin({
//         "process.env.NODE_ENV": JSON.stringify(
//           isProduction ? "production" : "development"
//         ),
//       }),
//     ].filter(Boolean),
//     optimization: {
//       minimize: isProduction,
//       minimizer: [
//         new TerserWebpackPlugin({
//           terserOptions: {
//             compress: {
//               comparisons: false,
//             },
//             mangle: {
//               safari10: true,
//             },
//             output: {
//               comments: false,
//               ascii_only: true,
//             },
//             warnings: false,
//           },
//         }),
//         new OptimizeCssAssetsPlugin(),
//         new ReactRefreshWebpackPlugin()
//       ],
//       splitChunks: {
//         chunks: "all",
//         minSize: 0,
//         maxInitialRequests: 10,
//         maxAsyncRequests: 10,
//         cacheGroups: {
//           vendors: {
//             test: /[\\/]node_modules[\\/]/,
//             name: 'vendors',
//             priority: -10,
//           },
//           common: {
//             minChunks: 2,
//             priority: -20,
//           },
//         },
//       },
//       runtimeChunk: "single",
//     },
//     devServer: {
//       compress: true,
//       historyApiFallback: true,
//       open: true,
//       port: 3000,
//     },
//     watch: true
//   };
// };
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/', // Explicitly set public path
    assetModuleFilename: 'assets/[name].[hash][ext]', // Include hash in the filename
  },
  devtool: 'source-map',
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
      (warning) => true,
    ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      }
,       {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
  }),
    new Dotenv(),
    new OptimizeCssAssetsPlugin(),
    new ReactRefreshWebpackPlugin(),
    new CopyWebpackPlugin({
                patterns: [
                  { from: 'public/images', to: 'images' },
                  { from: 'public/icons', to: 'icons' },
                  { from: 'public', to: 'build' },
                ],
              }),
  ],
  optimization: {
    // Minify JavaScript using Terser
    minimizer: [new TerserPlugin()],
    // Split common chunks into separate files for better caching
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
          extensions: [".js", ".jsx"],
        },
}