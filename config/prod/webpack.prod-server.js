const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = merge(baseConfig, {
  name: "server",
  entry: "./src/server/render.js",
  output: {
    filename: "prod-server-bundle.js",
    path: path.resolve(__dirname, "..", "..", "build"),
    libraryTarget: "commonjs2",
  },

  target: "node",
  externals: [
    nodeExternals({
      whitelist: ["react-universal-component", "webpack-flush-chunks"],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    // runtimeChunk: "single"
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [{ loader: "css-loader" }, { loader: "sass-loader" }],
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    //It will search for CSS assets during the Webpack build and will optimize \ minimize the CSS
    // new OptimizeCssAssetsPlugin(),
    // new CleanWebpackPlugin(),
    // new MiniCSSExtractPlugin(),
  ],
});
