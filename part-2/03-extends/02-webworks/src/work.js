self.onmessage = (message) => {
    self.postMessage({
        answer: `你好, ${message.data.question}！`,
    });
}