const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");

module.exports = merge(base, {
  entry: {
    server: path.resolve(__dirname, "../src/server-entry.js"),
  },
  target: "node",
  output: {
    libraryTarget: "commonjs2", // 导出供服务端渲染使用
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.ssr.html"),
      filename: "server.html",
      excludeChunks: ["server"],
      minify: false, // 不压缩
      client: '/client.bundle.js'
    }),
  ],
});
