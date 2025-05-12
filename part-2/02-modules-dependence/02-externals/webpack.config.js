const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        filename: './srcipts/[name].[contenthash].bundle.js',
        path: path.resolve(__dirname + '/dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    externalsType: 'script',
    externals: {
        jquery: [
           'https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js',
           '$'
        ]
    }
}