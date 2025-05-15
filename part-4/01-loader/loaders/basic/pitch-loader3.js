module.exports = function (content) {
    console.log('normal-loader3')
    return content;
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('pitch-loader3');
    console.log('remainingRequest', remainingRequest);
    console.log('precedingRequest', precedingRequest);
    console.log('data', data);
}