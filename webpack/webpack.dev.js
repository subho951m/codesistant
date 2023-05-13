const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  plugins: [
    // new BundleAnalyzerPlugin({
    //   generateStatsFile: true
    // })
  ]
};
