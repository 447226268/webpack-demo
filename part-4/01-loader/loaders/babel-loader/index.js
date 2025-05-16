const babel = require('@babel/core');
const schmea = require('./schema.json');

module.exports = function (content) {
    const callback = this.async();  // 异步回调
    const options = this.getOptions(schmea);

    babel.transform(content, options, function (err, result) {
        if (err) return callback(err);
        else callback(null, result?.code);
    })
}