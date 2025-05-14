const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "mylib.js",
        library: {
            name: "mylib",
            type: "umd",
        },
        globalObject: "globalThis",
        clean: true,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [

        ]
    },
}