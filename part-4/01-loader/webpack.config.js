const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./static/js/[name].js",
        chunkFilename: "./static/js[name].chunk.js",
        assetModuleFilename: "./static/media/[name].[hash][ext]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // use: [
                // "./loaders/demo/pitch-loader3.js",
                // "./loaders/demo/pitch-loader2.js",
                // "./loaders/demo/pitch-loader.js",
                // "./loaders/demo/raw-loader.js",
                // "./loaders/demo/async-loader.js",
                // "./loaders/demo/sync-loader.js",
                // ],
                use: [
                    "./loaders/clean-log-loader",
                    {
                        loader: "./loaders/banner-loader",
                        options: {
                            author: "zhouxinn",
                        }
                    },
                    {
                        loader: "./loaders/babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        }),
    ]
}