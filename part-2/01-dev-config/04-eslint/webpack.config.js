const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    mode: 'development',

    entry: "./src/app.js",

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new ESLintPlugin()
    ],

    devServer: {
        client: {
            overlay: false
        },
        static: "./dist",
        open: true,
    }
};
