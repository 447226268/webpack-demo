const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        clean: true,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: require.resolve('./src/app.js'),
                use: ["imports-loader?wrapper=window"]
            },
            {
                test: require.resolve('./src/global.js'),
                use: ["exports-loader?type=commonjs&exports=file,mutiple|helper.parse|parse"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
    ],
    optimization: {
        usedExports: true,
    }
}