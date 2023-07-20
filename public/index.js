class SayHello {
  sayHello = "bonjour";
  constructor(sayHello) {
    this.sayHello = sayHello;
    console.log(this.sayHello);
  }
}

new SayHello("ciao");

function sayHello(name) {
  console.log(`${greet} ${name}`);
}

const name = sayHello("Marco");
