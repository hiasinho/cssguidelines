const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
config.entry.app.unshift("webpack/hot/only-dev-server");

config.output.publicPath = "http://localhost:8080/";

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

module.exports = config
