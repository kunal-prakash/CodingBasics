
# TypeScript OOP Concepts – Detailed Notes

## 1. Class with Constructor and Access Modifiers

```ts
class Account {
  readonly id: number;
  owner: string;
  private _balance: number;
  nickname?: string;

  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this._balance = balance;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    if (value < 0) throw new Error("Invalid value");
    this._balance = value;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw Error("Invalid amount");
    this._balance += amount;
  }
}
```

### Key Concepts:
- `readonly`: Can only be assigned in the constructor.
- `private _balance`: Private property, prefixed with `_` by convention.
- `nickname?`: Optional property.
- `get`/`set`: Accessors for controlled access to `_balance`.

---

## 2. Concise Constructor Syntax

```ts
class Accounta {
  nickname?: string;
  constructor(public readonly id: number, public owner: string) {}
}
```

- This is a shorthand to define and assign constructor parameters.

---

## 3. Object Instantiation and Type Checking

```ts
let account = new Account(1, "Kunal", 0);
account.deposit(100);
console.log(account);
console.log(typeof account); // "object"
console.log(account instanceof Account); // true
```

---

## 4. Index Signature

```ts
class SeatAssignment {
  [seat: string]: string;
}

const seats = new SeatAssignment();
seats["A1"] = "Kunal";
seats.A2 = "John";
```

- Allows dynamic property names with a consistent value type.

---

## 5. Static Members

```ts
class Ride {
  static _activeRides: number = 0;
  start() { Ride._activeRides++; }
  stop() { Ride._activeRides--; }
}
```

- `static` variables are shared among all instances.
- `Access without instantiation`: You can access static variables using the ClassName.PropertyName syntax, without creating an object of the class first.
- `Cannot use this (in instance methods)`: Instance methods use the this keyword to access instance properties, but they cannot directly access static properties with this. Conversely, static methods can access other static properties using this (which refers to the class constructor) or the class name.

---

## 6. Inheritance

```ts
class Person {
  constructor(public firstName: string, public lastName: string) {}
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Student extends Person {
  constructor(firstName: string, lastName: string, public studentId: number) {
    super(firstName, lastName);
  }
  takeTest() {
    console.log("Taking a test");
  }
}
```

- `extends` Keyword: Used to establish the inheritance relationship between classes.
- `super` Keyword: Used in the child class to access the parent class's members, primarily to call the parent's constructor (super()) or methods (super.methodName())
  
---

## 7. Method Overriding

```ts
class Teacher extends Person {
  override get fullName() {
    return `Professor ${super.fullName}`;
  }
}
```
- allows a derived class to provide a specific implementation for a method that is already defined in its base class
- `override` keyword, which explicitly indicates that a method is intended to override a base class method. This is considered a best practice as it improves code stability and helps catch potential errors at compile time.
- You can override a method in a derived class in TypeScript without using the `override` keyword. 
  
---

## 8. Polymorphism

```ts
function printNames(person: Person[]) {
  for (let p of person) {
    console.log(p.fullName);
  }
}

printNames([new Student("John", "Doe", 1), new Teacher("Jane", "Smith")]);
```

- Same method (`fullName`) behaves differently depending on class.

---

## 9. Open/Closed Principle

- Classes should be **open for extension** but **closed for modification**.

---

## 10. Access Modifiers

```ts
class Accounts {
  protected _taxRate: number;
  constructor(taxRate: number) {
    this._taxRate = taxRate;
  }
}
```

- `private`: Accessible only within the class.
- `protected`: Accessible within class and subclasses.

---

## 11. Abstract Classes

```ts
abstract class Calendar1 {
  abstract getToday(): Date;
}

class GoogleCalendar1 extends Calendar1 {
  getToday(): Date {
    return new Date();
  }
}
```

- Cannot be instantiated directly.
- Can contain abstract and concrete methods.

---

## 12. Interfaces

```ts
interface Calendar {
  name: string;
  addEvent(): void;
}

class GoogleCalendar implements Calendar {
  constructor(public name: string) {}
  addEvent(): void {
    throw new Error("Method not implemented.");
  }
}
```
- Syntactical contract that defines the shape of an object, including its properties and methods, but without providing implementation details
  
---

## 13. Abstract Classes vs Interfaces

| Feature                    | Abstract Class         | Interface               |
|----------------------------|------------------------|-------------------------|
| Abstract Methods           | ✅                     | ✅                     |
| Non-Abstract Methods       | ✅                     | ❌                     |
| Protected Members          | ✅                     | ❌                     |
| Constructors               | ✅                     | ❌                     |
