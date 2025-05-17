import "./help.js"
console.log("hello main");

console.log("hello 11");
console.log("hello 22");
console.log("hello 33");
console.log("hello 44");


const sum = (...args) => {
    return args.reduce((a, b) => a + b, 0);
}