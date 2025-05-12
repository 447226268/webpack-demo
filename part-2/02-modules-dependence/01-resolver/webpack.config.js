const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: './srcipts/[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Module Dependence',
            filename: 'index.html',
            template: 'index.html',
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "@components": path.resolve(__dirname, 'src/components'),
        },
        extensions: ['.js', '.json', '.jsx'],
    }
}