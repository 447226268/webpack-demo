const schmea = require('./schema.json');

module.exports = function (content) {
    // schemea符合JSON Schema规范
    const options = this.getOptions(schmea);

    const prefix = `
    /*
     * author: ${options?.author}
     * date: 2020-12-12
     * description: xxx
     */
    `;


    return prefix + content;
}