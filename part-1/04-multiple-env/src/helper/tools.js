function getString(str) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello world!");
        }, 2000);
    })
}

async function helloWorld() {
    let str = await getString();
    console.log(str);
}

export default helloWorld;