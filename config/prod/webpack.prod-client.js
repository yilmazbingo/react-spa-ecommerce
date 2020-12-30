const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseConfig, {
  name: "client",

  // you should separate the vendor chunks from your application chunks due to caching purposes. Your application code simply changes more often than the vendor code
  // Vendor bundles can thus be cached for a longer time,
  // this is "vendor-code-splitting". we will be using those modules in every file
  entry: "./src/client/main.js",

  // use particularly hash and chunkhash only for production purposes as hashing doesn't do much good during development.
  //  Images and fonts should receive hash while chunks should use chunkhash in their names to invalidate them correctly
  output: {
    filename: "[name].[chunkhash]-bundle.js",
    path: path.resolve(__dirname, "../../dist"),
    chunkFilename: "[name].js",
    publicPath: "/",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
        cache: true,
        parallel: true,
      }),
    ],
    runtimeChunk: {
      name: "manifest",
    },

    splitChunks: {
      chunks: "initial",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      // -------CACHING-----
      cacheGroups: {
        // all of npm code i want it inside a block
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
        common: {
          test: /[\\/]src[\\/]components[\\/]/,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },

          { loader: "css-loader",options:{sourceMap:true,importLoaders:1} },
          { loader: "sass-loader",options:{sourceMap:true} },
        ],
      },
    ],
  },
  plugins: [
    // new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin(),
    new CompressionPlugin(),
    new BrotliPlugin(),
  ],
});
