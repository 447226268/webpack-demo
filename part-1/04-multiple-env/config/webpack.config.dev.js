module.exports = {
    mode: "development", // 模式：development 或 production
    output: {
        filename: 'srcipts/[name].js', // 输出文件名
    },
    devtool: 'inline-source-map', // 源码映射
    devServer: {
        static: "./dist",
        open: true, // 自动打开浏览器
    }
};