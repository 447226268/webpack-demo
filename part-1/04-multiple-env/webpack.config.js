const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    const mode = env.production ? "production" : "development"; // 判断是否为生产环境

    return {
        mode: mode, // 模式：development 或 production
        entry: {
            index: './src/index.js', // 入口文件
            another: './src/another-module.js', // 另一个入口文件
        },
        output: {
            filename: 'srcipts/[name].[contenthash].js', // 输出文件名
            path: path.resolve(__dirname, 'dist'), // 输出路径
            clean: true, // 清理输出目录
            assetModuleFilename: 'images/[contenthash][ext]', // 资源文件名格式，优先级低
            publicPath: 'http://localhost:8080/', // 公共路径
        },
        devtool: 'inline-source-map', // 源码映射
        module: {
            rules: [
                {
                    test: /\.png$/, // 匹配 png 文件
                    type: 'asset/resource', // 资源类型
                    generator: {
                        filename: 'images/[contenthash][ext]', // 资源文件名格式
                    }
                }, {
                    test: /\.svg$/, // 匹配 svg 文件
                    type: 'asset/inline', // 内联资源
                }, {
                    test: /\.txt$/, // 匹配 txt 文件
                    type: 'asset/source', // 资源源文件
                }, {
                    test: /\.jpg$/, // 匹配 jpg 文件
                    type: 'asset', // 资源类型
                    parser: {
                        dataUrlCondition: {
                            maxSize: 8 * 1024, // 大小限制，超过则使用 file 类型
                        },
                    },
                    generator: {
                        filename: 'images/[contenthash][ext]', // 资源文件名格式
                    }
                }, {
                    test: /\.(css|less)$/, // 匹配 CSS 文件
                    use: [
                        MiniCssExtractPlugin.loader, // 提取 CSS 文件到单独文件中
                        // 'style-loader', // 将 CSS 以 Style 插入到 DOM 中
                        'css-loader', // 解析 CSS 文件
                        'less-loader', // 解析 LESS 文件
                    ],
                }, {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i, // 匹配 font 文件
                    type: 'asset/resource', // 资源类型
                    generator: {
                        filename: 'fonts/[contenthash][ext]', // 资源文件名格式
                    }
                }, {
                    test: /\.(csv|tsv)$/,
                    use: ['csv-loader'], // 解析 CSV 文件 
                }, {
                    test: /\.xml$/,
                    use: ['xml-loader'], // 解析 XML 文件
                }, {
                    test: /\.js$/, // 匹配 JS 文件
                    exclude: /node_modules/, // 排除 node_modules 目录
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'], // 使用 Babel 预设
                        }
                    }
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html', // 模板文件
                filename: 'index.html', // 输出文件名
                inject: 'body', // 将脚本插入到 body 中
            }),
            new MiniCssExtractPlugin({
                filename: 'styles/[contenthash].css', // 输出 CSS 文件名
                chunkFilename: 'styles/[contenthash].css', // 输出 CSS 文件名
                ignoreOrder: false, // 忽略 CSS 顺序
            })
        ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(), // CSS 最小化插件
                new TerserPlugin(),// JS 最小化插件
            ],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 目录
                        name: 'vendors', // 输出文件名
                        chunks: 'all', // 所有 chunk 都使用
                    },
                },
            }
        },
        devServer: {
            static: "./dist",
            open: true, // 自动打开浏览器
        }
    };
}