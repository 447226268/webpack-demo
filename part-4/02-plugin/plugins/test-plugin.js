/**
 * 1、webpack加载webpack.config.js中所有配置，此时就为new TestPlugin()，执行插件的constructor方法
 * 2、webpack创建compiler对象
 * 3、遍历所有plugins中插件，调用插件的apply方法
 * 4、执行剩下编译流程（触发各个hooks方法）
 */
class TestPlugin {
    constructor() {
        console.log('TestPlugin is loaded');
    }

    apply(compliler) {
        debugger
        console.log('TestPlugin is applied');

        // environment钩子是同步的，所以这里使用tap
        compliler.hooks.environment.tap('TestPlugin', () => {
            console.log('TestPlugin: environment');

        })

        // emit异步串行
        compliler.hooks.emit.tap('TestPlugin', (compilation) => {
            console.log('TestPlugin: emit tap');
        })

        compliler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin: emit tapAsync');
                callback()
            }, 1000)
        })

        compliler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('TestPlugin: emit tapPromise');
                    resolve()
                }, 1000)
            })
        })

        // make异步并行
        compliler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
            // 需要在comoliation hooks之前调用
            compilation.hooks.seal.tap("TestPlugin", () => {
                console.log("TestPlugin: seal tapAsync seal")
            })

            setTimeout(() => {
                console.log('TestPlugin: make tapAsync');
                callback()
            }, 1000)
        })

        compliler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin: make tapAsync');
                callback()
            }, 2000)
        })
    }


}

module.exports = TestPlugin;