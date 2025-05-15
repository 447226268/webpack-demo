/**
 * loader 是一个函数
 * 当webpack解析资源时，会调用相应的loader去处理
 * loader接受到文件内容作为参数，返回内容出去
 * 
 *  content 文件内容
 *  map 文件source map
 *  meta 文件元数据
 * 
 */
module.exports = function (content, map, meta) {
    console.log(content)
    return content
}