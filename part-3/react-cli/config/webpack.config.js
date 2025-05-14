const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production" ? true : false; // 是否是生产环境

const getStyleLoader = (pre) => {
    return [
        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
        "css-loader",
        {
            // 处理兼容性
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"]
                }
            }
        },
        pre
    ].filter(Boolean)
}

module.exports = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    entry: "./src/main.js",
    output: {
        path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
        filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
        chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: getStyleLoader(),
            },
            {
                test: /\.less$/,
                use: getStyleLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStyleLoader("stylus-loader")
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb
                    }
                }
            },
            // 处理公共资源
            {
                test: /\.(woff?|ttf)$/,
                type: "asset/resource"
            },
            // 处理js
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: [
                        !isProduction && "react-refresh/babel", // 激活jsx的HMR
                    ].filter(Boolean)
                }
            }
        ]
    },
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        isProduction && new MiniCssExtractPlugin({ // 将css提取到单独文件
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
        }),
        isProduction && new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    globOptions: {
                        ignore: ["**/index.html"],
                    },
                },
            ],
        }),
        !isProduction && new ReactRefreshWebpackPlugin(), // 开启react-refresh插件
    ].filter(Boolean),
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                // react reac-dom react-router-dom
                reat: {
                    test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
                    name: "chunk-react",
                    priority: 40,
                },
                // antd
                antd: {
                    test: /[\\/]node_modules[\\/]antd(.*)?[\\/]/,
                    name: "chunk-antd",
                    priority: 30,
                },
                // 其余node_modules
                libs: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "chunk-libs",
                    priority: 20,
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`
        },
        minimize: isProduction, // 是否压缩
        minimizer: [
            new TerserWebpackPlugin(), // 压缩js
            new CssMinimizerWebpackPlugin() // 压缩css
        ]
    },
    // webpack解析模块规则
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src")
        },
        // 自动补全文件扩展名
        extensions: [".jsx", ".js", ".json"]
    },
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true, // 开启HDM
        historyApiFallback: true, // 解决404问题
    },
}