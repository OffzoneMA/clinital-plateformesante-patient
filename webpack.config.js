const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin=require('copy-webpack-plugin');
// const DEVELOPMENT = process.env.NODE_ENV === "development";
// const PRODUCTION = process.env.NODE_ENV === "production";
module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return {
    devtool: isDevelopment && "cheap-module-source-map",
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "assets/js/[name].[contenthash:8].js",
      publicPath: "/"
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
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development"
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader"
          ]
        }, {
            test: /\.s[ac]ss$/i,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  // Add the option to ignore color contrast warnings
                  sassOptions: {
                    quietDeps: true
                  }
                }
              }
            ]
          },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        },
        {
          test: /\.svg$/,
          use: ["react-svg-loader"]
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve("file-loader"),
          options: {
            name: "static/media/[name].[hash:8].[ext]"
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "assets/css/[name].[contenthash:8].css",
          chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
        }),
        new Dotenv(),
        isProduction && new CopyWebpackPlugin({
            patterns: [
              { from: 'public/images', to: 'images' }, // Copy images from public/images to dist/images
              { from: 'public/icons', to: 'icons' },   // Copy icons from public/icons to dist/icons
              { from: 'public/icons', to: 'icons' }, 
              { from: 'public', to: 'build' },   // Copy icons from public/ to dist/
            ],
          }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        inject: true
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        )
      })
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          }
        }),
        new OptimizeCssAssetsPlugin()
      ],
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxInitialRequests: 10,
        maxAsyncRequests: 10,
        cacheGroups: {
          vendors: {
            // Use a more robust regular expression to match node_modules paths
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors', // Optionally, you can give it a fixed name
            priority: -10
          },
          common: {
            minChunks: 2,
            priority: -20
          }
        }
      },
      runtimeChunk: "single"
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
      port : 3000
    //   overlay: true
    }
  };
};