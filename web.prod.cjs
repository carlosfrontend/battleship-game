const { merge } = require("webpack-merge");
const common = require("./web.common.cjs");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
});
