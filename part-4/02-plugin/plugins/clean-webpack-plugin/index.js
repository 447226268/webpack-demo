class CleanWebpackPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        const outputPath = compiler.options.output.path
        const fs = compiler.outputFileSystem

        compiler.hooks.emit.tap("CleanWebpackPlugin", (compilation) => {
            this.removeFiles(fs, outputPath)
        })
    }

    removeFiles(fs, path) {
        const files = fs.readdirSync(path);
        files.forEach((file) => {
            const filePath = path + "/" + file;
            if (fs.statSync(filePath).isDirectory()) {
                this.removeFiles(fs, filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        })
    }
}

module.exports = CleanWebpackPlugin;