const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugins/test-plugin.js");
const BannerWebpackPlugin = require("./plugins/banner-webpack-plugin");
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin");
const AnalyzeWebpackPlugin = require("./plugins/analyze-webpack-plugin");

module.exports = {
    mode: "production",
    devtool: "cheap-module-source-map",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./static/js/[name].js",
        chunkFilename: "./static/js[name].chunk.js",
        assetModuleFilename: "./static/media/[name].[hash][ext]",
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        }),
        // new TestPlugin(),
        new BannerWebpackPlugin({
            author: "zhouxinn"
        }),
        new CleanWebpackPlugin(),
        new AnalyzeWebpackPlugin(),
    ]
}