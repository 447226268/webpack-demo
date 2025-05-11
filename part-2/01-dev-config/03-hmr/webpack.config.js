const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        clean: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './index.html',
        })
    ],
    devServer: {
        static: path.resolve(__dirname, './dist'),
        hot: false, // 启用热模块替换
        liveReload: false, // 启用实时重载
        open: true, // 自动打开浏览器
    }
}