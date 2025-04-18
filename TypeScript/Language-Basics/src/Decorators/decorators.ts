//Decorators -> is a function that modifies the behavior of a class, method, or property. It is called at js runtime.
//PascalCase for decorators

//Similar to inheritance
//But it is more flexible than inheritance

//Class Decorator
//The issue here is with TypeScript's type system and runtime behavior:

//1. At runtime, the Component decorator adds properties and methods to MyComponent's prototype
//2. But TypeScript doesn't know about these additions at compile time
//3. This causes type errors because the TypeScript compiler can't see the dynamically added members

function Component(constructor: Function) {
  console.log("Component decorator called");
  constructor.prototype.greeting = "Hello, world!";
  constructor.prototype.uniqueId = Math.random();
  constructor.prototype.insertInDOM = () => {
    console.log("Inserting in DOM");
  };
}

// To fix this, we need to declare the types that will be added:
interface ComponentDecorator {
  greeting: string;
  uniqueId: number;
  insertInDOM(): void;
}

@Component
// Tell TypeScript about the additional properties
class MyComponent implements ComponentDecorator {
  // TypeScript now knows these exist
  greeting!: string;
  uniqueId!: number;
  insertInDOM!: () => void;
}

// Now TypeScript understands these properties exist
let myComponent = new MyComponent();
console.log(myComponent.greeting); // Works without type error
console.log(myComponent.uniqueId); // Works without type error
myComponent.insertInDOM(); // Works without type error

//----Parameterised Decorators----
// Decorator Factory
function Component2(options: { selector: string }) {
  return (constructor: Function) => {
    console.log("Component222222 decorator called");
    constructor.prototype.selector = options.selector;
  };
}

@Component2({ selector: "#my-component" })
class MyComponent2 {}

// Decorator Composition(Multiple Decorators)
//Similar to  f(g(x)) first g(x) will be called and then f(x) will be called ->Component2 will be called first and then Component will be called
function Pipe(constructor: Function) {
  console.log("Pipe decorator called");
}

@Component
@Pipe
class MyComponent3 {}

//Method Decorator -> It is used to modify the behavior of a method

//PropertyDescriptor -> It is used to describe the property of a class or object
function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log("Method decorator called");
  const originalMethod = descriptor.value as Function;
  descriptor.value = function (...args: any[]) {
    console.log("Before");
    originalMethod.apply(this, args);
    console.log("After");
  };
}

class Person1 {
  @Log
  sayHello(firstName: string, lastName: string) {
    console.log(`Hello, ${firstName} ${lastName}!`);
  }
}

let person1 = new Person1();
person1.sayHello("John", "Doe");

//Accessor Decorator -> It is used to modify the behavior of a accessor

function Capitalize(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.get as Function;
  descriptor.get = function () {
    const result = originalMethod.call(this);
    return typeof result === "string" ? result.toUpperCase() : result;
  };
}

class Person2 {
  constructor(private _firstName: string, private _lastName: string) {}
  @Capitalize
  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}

let person2 = new Person2("john", "snow");
console.log(person2.fullName);

//Property Decorator -> It is used to modify the behavior of existing property
function MinLength(length: number) {
  return (target: any, propertyName: string) => {
    let value: string;
    const descriptor: PropertyDescriptor = {
      get() {
        return value;
      },
      set(newValue: string) {
        if (newValue.length < length) {
          throw Error(`${propertyName} is less than ${length} characters`);
        }
        value = newValue;
      },
    };
    Object.defineProperty(target, propertyName, descriptor);
  };
}

class User {
  @MinLength(5)
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}

let user = new User("12345");
console.log(user.password);

//Parameter Decorator -> It is used to modify the behavior of a parameter

interface WatchedParameter {
  parameterName: string;
  parameterIndex: number;
}
const watchedParameters: WatchedParameter[] = [];
function Watch(target: any, parameterName: string, parameterIndex: number) {
  watchedParameters.push({
    parameterName,
    parameterIndex,
  });
}

class Vehicle {
  move(@Watch speed: number) {}
}

console.log(watchedParameters);
