const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

require("dotenv").config();
// The url-loader will transform your images into base64 URIs.
// the file is too big to serve it as a base64 URI. Instead, the file-loader will be used that will just copy your files.

module.exports = {
  entry: ["regenerator-runtime/runtime", "./src/app.js"],
  output: {
    // globalObject: "this",

    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  mode: "production", // default value
  target: "web",
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      //   { test: /\.s?css$/, use: ["style-loader", "css-loader", "sass-loader"] },
      {
        test: /\.(scss|css)$/,
        use: [
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              // modules: true,
              sourceMap: true,
            },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      { test: /\.(png|jpg|jpeg|gif|ico)$/, loader: "file-loader" },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  // devtool: "eval-cheap-source-map", // this makes bundles bigger. this is for dev
  devtool: "source-map", //build will be slower  but smaller in size. it is external file
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "public"),
    overlay: true,
    // publicPath:"/dist/" if needed
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin({ logo: "./src/logo.png" }),
    new webpack.DefinePlugin({
      "process.env.STRIPE_PUBLIC_API_KEY": JSON.stringify(
        process.env.STRIPE_PUBLIC_API_KEY
      ),
      "process.env.STRIPE_SECRET_KEY": JSON.stringify(
        process.env.STRIPE_SECRET_KEY
      ),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),

      "process.env.FIREBASE_API_KEY": JSON.stringify(
        process.env.FIREBASE_API_KEY
      ),
      "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
        process.env.FIREBASE_AUTH_DOMAIN
      ),
      "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
        process.env.FIREBASE_DATABASE_URL
      ),
      "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
        process.env.FIREBASE_PROJECT_ID
      ),
      "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
        process.env.FIREBASE_STORAGE_BUCKET
      ),
      "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
        process.env.FIREBASE_MESSAGING_SENDER_ID
      ),
      "process.env.FIREBASE_APP_ID": JSON.stringify(
        process.env.FIREBASE_APP_ID
      ),
      "process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(
        process.env.FIREBASE_MEASUREMENT_ID
      ),
    }),
  ],
};
