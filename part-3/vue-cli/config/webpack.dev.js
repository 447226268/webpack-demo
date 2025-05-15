const path = require("path")
const { DefinePlugin } = require("webpack")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader')

const getStyleLoader = (pre) => {
    return [
        "style-loader",
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
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: "./src/main.js",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]"
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
                    cacheDirectory: true,
                    cacheCompression: false,
                }
            },
            // 处理vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
        new VueLoaderPlugin(), // vue-loader插件
        new DefinePlugin({ // 定义环境变量给源代码使用
            __VUE_OPTIONS_API__: "true",
            __VUE_PROD_DEVTOOLS__: "false",
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false"
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`
        }
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