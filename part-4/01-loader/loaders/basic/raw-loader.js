// raw loader接收到的数据是二进制数据
module.exports = function (content) {
    console.log(content);
    return content;
}

module.exports.raw = true; // 告诉 loader 返回的是 Buffer 类型