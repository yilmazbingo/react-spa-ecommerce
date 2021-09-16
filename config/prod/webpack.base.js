// in html template favicon has its link. so no need for any package
const path = require("path");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
// var ImageminPlugin = require("imagemin-webpack-plugin").default;

require("dotenv").config({ path: "production.env" });

module.exports = {
  // resolve: {
  //   modules: [path.resolve(__dirname, "../../src"), "node_modules"],
  // },

  // convention over configuration, which basically means that you get a meaningful configuration simply by setting the mode to "PRODUCTION"
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules/,
      },

      { test: /\.svg$/, loader: "svg-inline-loader" },
      // {
      //   test: /\.md$/,
      //   use: [{ loader: "html-loader" }, { loader: "markdown-loader" }],
      // },

      {
        test: /\.(jpg|jpeg|png|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash:4].[ext]",
              outputPath: "images/",
            },
          },
          // {
          //   loader: "image-webpack-loader",
          // },
        ],
      },
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
  plugins: [
    //this is very important for ssr
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new OptimizeCssAssetsPlugin(),
    // ------------it creates issue
    new LoadablePlugin(),
    // new ImageminPlugin({
    //   pngquant: {
    //     quality: "95-100",
    //   },
    // }),

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
