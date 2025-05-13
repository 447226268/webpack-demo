const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: {
            import: ["./src/app.js", "./src/app2.js"],
            dependOn: "lodash",
            filename: "chanel1/[name].js",
        },
        main2: {
            import: ["./src/app3.js"],
            dependOn: "lodash",
            filename: "chanel1/[name].js",
        },
        lodash: {
            import: "lodash",
            filename: "common/[name].js",
        },
    },
    output: {
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Multiple Pages",
            template: "./index.html",
            filename: "/chanel1/index.html",
            inject: "body",
            chunks: ["main", "lodash"],
            publicPath: "http://wwww.b.com/"
        }),
        new HtmlWebpackPlugin({
            template: "./index2.html",
            filename: "/chanel2/index2.html",
            inject: "body",
            chunks: ["main2", "lodash"],
            publicPath: "http://wwww.a.com/"
        }),
    ]
}