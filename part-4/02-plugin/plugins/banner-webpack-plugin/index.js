
class BannerWebpackPlugin {
    constructor(options) {
        this.options = options || {};
    }

    apply(compiler) {
        compiler.hooks.emit.tap("BannerWebpackPlugin", (compilation) => {
            const extensions = ['js', 'css']
            const assets = Object.keys(compilation.assets).filter((assetName) => {
                const splitted = assetName.split('.');
                const extension = splitted[splitted.length - 1]
                return extensions.includes(extension);
            })
            const prefix = `/*
* Author: ${this.options.author}
*/
`;
            assets.forEach((asset) => {
                const source = compilation.assets[asset];
                compilation.assets[asset] = {
                    source: () => prefix + source.source(),
                    size: () => source.size()
                }
            })
        })
    }
}

module.exports = BannerWebpackPlugin;