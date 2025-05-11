const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "production", // 模式：development 或 production
    output: {
        filename: 'srcipts/[name].[contenthash].js', // 输出文件名
        publicPath: 'http://localhost:8080/', // 公共路径
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), // CSS 最小化插件
            new TerserPlugin(),// JS 最小化插件
        ],
    },
    performance: {
        hints: false, // 关闭性能提示
    },
};