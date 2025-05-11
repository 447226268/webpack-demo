const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        clean: true,
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true, // 默认值为true
        port: 3000,
        host: "0.0.0.0", // 允许外部访问
        open: true,

        headers: {
            'x-Access-Token': 'abc123'
        },

        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:9000',
            },
        ],

        server: 'spdy',

        historyApiFallback: true, // 允许浏览器使用 HTML5 History API 回退
    }
}