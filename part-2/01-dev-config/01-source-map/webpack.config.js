const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./app.js",
    output: {
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    // devtool: "eval",
    // devtool: "source-map",
    // devtool: "hidden-source-map",
    // devtool: "inline-source-map",
    // devtool: "cheap-source-map",
    devtool: "cheap-module-source-map", // 推荐开发环境
}