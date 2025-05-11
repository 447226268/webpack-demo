const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js'); // 引入公共配置
const devConfig = require('./webpack.config.dev.js'); // 引入开发配置
const prodConfig = require('./webpack.config.prod.js'); // 引入生产配置

module.exports = (env) => { // 根据环境变量选择配置
    if (env.production) {
        return merge(commonConfig, prodConfig); // 生产环境配置
    } else {
        return merge(commonConfig, devConfig); // 开发环境配置
    }
}
