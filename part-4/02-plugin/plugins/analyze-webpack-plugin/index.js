class AnalyWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tap('AnalyzeWebpackPlugin', (compilation) => {
            const assets = Object.keys(compilation.assets);
            let content = `| 资源名称 | 资源大小 |
| --- | --- |`;
            assets.forEach((assetName) => {
                const size = compilation.assets[assetName].size();
                content += `\n| ${assetName} | ${size} |`;
            })
            compilation.assets['analyze.md'] = {
                source: () => content,
                size: () => content.length
            }
        })
    }
}

module.exports = AnalyWebpackPlugin;