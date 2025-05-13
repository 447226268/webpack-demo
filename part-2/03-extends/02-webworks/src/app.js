const worker = new Worker(new URL('./work.js', import.meta.url));

worker.postMessage({
    question: "zx",
});

worker.onmessage = (message) => {
    console.log(message);
}