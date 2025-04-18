class Account {
  readonly id: number; // to be only assigned in constructor
  owner: string;
  private _balance: number; // private varible naming convention starts with _. Can only be accessed through getter and setter
  nickname?: string; // optional so not assigned in constructor

  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this._balance = balance;
  }

  //getter
  get balance(): number {
    return this._balance;
  }

  //setter
  set balance(value: number) {
    if (value < 0) throw new Error("Invalid value");
    this._balance = value;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw Error("Invalid amount");
    this._balance += amount;
  }
  //   nn(name: string): void {
  //     this.nickname = name;
  //   }
}

//******* consize way of writing the constructor
class Accounta {
  nickname?: string;
  constructor(
    public readonly id: number,
    public owner: string
  ) // private _balance: number
  {}
}
//*************** */

let account = new Account(1, "Kunal", 0);
account.deposit(100);
// account.nn("cr7");
console.log(account);
console.log(typeof account); //object
console.log(account instanceof Account); //true

//index signature
// Index signatures in TypeScript allow you to define objects that can have multiple properties of the same type, where the property names (keys) themselves are not known in advance but follow a specific pattern.
// Common use cases include things like dictionaries, maps, or in your case, seat assignments where you might have an unknown number of seats but know they'll all follow the same pattern
class SeatAssignment {
  [seat: string]: string;
}

const seats = new SeatAssignment();
seats["A1"] = "Kunal";
seats.A2 = "John";

//Static Members -> belong to the class not the instance
class Ride {
  static _activeRides: number = 0;
  start() {
    Ride._activeRides++;
  }
  stop() {
    Ride._activeRides--;
  }
}

let ride1 = new Ride();
ride1.start();
let ride2 = new Ride();
ride2.start();
console.log(Ride._activeRides); //_activeRides is static and belongs to the class Ride and not the instance ride1 or ride2

//inheritance -> extends a class and inherits its properties and methods
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

//Method Overriding -> override a method of the parent class
class Teacher extends Person {
  override get fullName() {
    return `Professor ${super.fullName}`;
  }
}

//Polymorphism -> a class method can be overridden by a subclass method with the same name, i.e., a method can have different implementations in different subclasses
printNames([new Student("John", "Doe", 1), new Teacher("Jane", "Smith")]);
function printNames(person: Person[]) {
  for (let p of person) {
    console.log(p.fullName);
  }
}

//****Open Closed Principle */ -> classes should be open for extension but closed for modification

//Private Members -> can be accessed only within the class(Not Inherited)
//Protected Members -> can be accessed within the class and its subclasses
class Accounts {
  // private _balance: number;
  // Protected members are inherited. Could lead to tighly coupled classes,i.e., if the parent class changes, the child class will also change.
  // Private members are not.
  protected _taxRate: number;
  constructor(taxRate: number) {
    // this._balance = balance;
    this._taxRate = taxRate;
  }
}

//Abstract Classes-> cannot be instantiated, can only be inherited
//Abstract Methods -> It can only exist in abstract classes and must be implemented in the subclass(the class that extends the abstract class)
abstract class Calendar1 {
  abstract getToday(): Date;
}

class GoogleCalendar1 extends Calendar1 {
  getToday(): Date {
    return new Date();
  }
}

//Interfaces -> define a contract that a class must follow. Only define the signature of the class.
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

//Difference between abstract classes and interfaces
//Abstract classes can have both abstract and non-abstract methods.
//Interfaces can only have abstract methods.
//Abstract classes can have protected members.
//Interfaces can only have public members.
//Abstract classes can have constructors.
//Interfaces cannot have constructors.
