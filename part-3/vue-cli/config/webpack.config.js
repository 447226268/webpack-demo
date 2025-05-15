const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require("webpack")

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const isProduction = process.env.NODE_ENV === "production"; // 是否是生产环境

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
                test: /\.js?$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true, // 开启babel缓存
                    cacheCompression: false, // 关闭缓存文件压缩
                }
            },
            // 处理vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/.vue-loader"), // 开启缓存
                }
            },
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
        new VueLoaderPlugin(), // vue-loader插件
        new DefinePlugin({ // 定义环境变量给源代码使用
            __VUE_OPTIONS_API__: "true",
            __VUE_PROD_DEVTOOLS__: "false",
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false"
        }),
        AutoImport.default({
            resolvers: [ElementPlusResolver()],
        }),
        Components.default({
            resolvers: [ElementPlusResolver()],
        }),
    ].filter(Boolean),
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
                    name: "vue-chunk",
                    priority: 40,
                },
                elementPlus: {
                    test: /[\\/]node_modules[\\/]element-plus(.*)?[\\/]/,
                    name: "elementPlus-chunk",
                    priority: 30,
                },
                libs: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "libs-chunk",
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
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true, // 解决404问题
    },
    // webpack解析模块规则
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src")
        },
        // 自动补全文件扩展名
        extensions: [".vue", ".js", ".json"]
    }
}