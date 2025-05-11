class A {
    constructor() {
        this.str = "hello world";
    }

    sayHello() {
        console.log(this.str);
    }
}

const a = new A();
a.sayHello();