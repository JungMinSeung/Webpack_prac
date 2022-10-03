const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // mode
  mode: "development",
  // entry
  entry: {
    main: "./app.js",
  },
  // output
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js", // 엔트리가 여러개일 경우 [name]에 하나씩 들어가서 아웃풋도 여러개 생성됨. 현재는 main 하나임.
  },
  // loader -> module 객체
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ], // 뒤에서부터 로더를 실행함 -> css-loader 실행 후에 style-loader 실행, MiniCssExtractPlugin 쓸때는 자체 Loader 써야함
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 20000, // 20kb미만(nyancat.jpg)은 자바스크립트 문자열(base64)로 변환하고, 그 이상(bg.png)은 file-loader가 동작하게함.
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // plugin -> plugins 배열
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}
      `,
    }),
    new webpack.DefinePlugin({
      TWO: "1+1",
      STRING_TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ],
};
