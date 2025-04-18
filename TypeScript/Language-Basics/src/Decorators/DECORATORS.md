
# TypeScript Decorators - Detailed Notes

## What are Decorators?
- A **decorator** is a special kind of declaration that can be attached to a class, method, accessor, property, or parameter.
- They are **functions** that modify the behavior of the thing they are attached to.
- Decorators are executed at **runtime**.

## Decorator Naming Convention
- Decorators use **PascalCase** naming convention.

## Why Use Decorators?
- Similar to inheritance, but **more flexible**.
- Useful for adding reusable behavior dynamically.

---

## Class Decorator

```ts
function Component(constructor: Function) {
  console.log("Component decorator called");
  constructor.prototype.greeting = "Hello, world!";
  constructor.prototype.uniqueId = Math.random();
  constructor.prototype.insertInDOM = () => {
    console.log("Inserting in DOM");
  };
}
```

### TypeScript Compatibility Fix
```ts
interface ComponentDecorator {
  greeting: string;
  uniqueId: number;
  insertInDOM(): void;
}

@Component
class MyComponent implements ComponentDecorator {
  greeting!: string;
  uniqueId!: number;
  insertInDOM!: () => void;
}
```

---

## Parameterized Decorators (Decorator Factories)

```ts
function Component2(options: { selector: string }) {
  return (constructor: Function) => {
    console.log("Component222222 decorator called");
    constructor.prototype.selector = options.selector;
  };
}

@Component2({ selector: "#my-component" })
class MyComponent2 {}
```

---

## Decorator Composition

```ts
function Pipe(constructor: Function) {
  console.log("Pipe decorator called");
}

@Component
@Pipe
class MyComponent3 {}
```

- Executed like `f(g(x))`: inner decorator (`Pipe`) runs first.

---

## Method Decorator

```ts
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
```

---

## Accessor Decorator

```ts
function Capitalize(target: any, methodName: string, descriptor: PropertyDescriptor) {
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
```

---

## Property Decorator

```ts
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
```

---

## Parameter Decorator

```ts
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
```

---

## Summary

| Decorator Type      | Target                          |
|---------------------|----------------------------------|
| Class               | Modifies a class definition      |
| Method              | Modifies a method                |
| Accessor            | Modifies getter/setter           |
| Property            | Modifies a property              |
| Parameter           | Modifies method parameter        |
