//Typescript is first transpiled to JS for the browser to understand
// The variables can implicitly(if possible) assign the types in typescript

console.log("Hello world");
let age: number = 20;
if (age > 50) age += 10;
console.log(age);

// Built-in data types
let sales = 123_456_789; //1.number
let course = "Typescript"; //2.string
let is_published = true; //3.boolean
let level; //4.any -> similar to js not recommended to use
let num_arrays: number[] = [1, 2, 3]; //5.array ->type is not need to be defined implicitly, can be auto picked from declaration
let tuple_example: [number, string] = [1, "tuple"]; //6.tuple is fixed length arrays with pre defined type, array property push will work(issue). Should not use it for more than 2 values.

//PascalCase for naming enum type
// 7.enum
const enum Size {
  Small = 1,
  Medium,
  Large,
}
let mySize = Size.Small;
console.log(mySize); // try using enum and check the transpiled code as in js file for the same

//Function
// while defining the functions always properly annotate the function with the proper parameter type and return type
// noUnusedLocals, noUsedParameters, noImplicitReturns to be enabled in tsconfig
function calculateTax(income: number, taxYear = 2022): number {
  //   let x; //noUnusedLocals enablement gives a warning that x is unused in the function
  if (taxYear > 2022) {
    return income * 1.3;
  }
  return income * 1.2;
}

//Objects
// readonly will not allow us to modify the property to which it is assigned
let employee: {
  readonly id: number;
  name?: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  retire: (date: Date) => {
    console.log(date);
  },
};

//***********Advance types**********//
// 1. type alias
type Employee = {
  readonly id: number;
  name?: string;
  retire: (date: Date) => void;
};

let new_employee: Employee = {
  id: 1,
  retire: (date: Date) => {
    console.log(date);
  },
};

//2. union type
function kgToLbs(weight: number | string) {
  if (typeof weight == "number") return weight * 2.2;
  else return parseInt(weight) * 2.2;
}
console.log(kgToLbs(10));
console.log(kgToLbs("10Kg"));

//3. intersection type
type Draggable = {
  drag: () => void;
};

type Resizeable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizeable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};

// 4. literal type (exact, specific)
type AllowedQuantity = 50 | 100;

let quantity: AllowedQuantity = 50;

// 5. Nullable type (null & undefined are passed as specific type)
function greet(name: string | null | undefined) {
  if (name) console.log(`hi ${name.toUpperCase()}`);
  console.log("hola");
}

console.log(greet(null)); // if null value not allowed for parameter will give error. Typescript gives this so that name.toUpperCase() does not throw error
console.log(greet("modi"));
console.log(greet(undefined));

// 6. Optional Chaining
type Customer = { birthday?: Date };
function getCustomerBirthday(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomerBirthday(0);
//optional property access operator to handle the scenarios where customer object is null or undefined rather than using if else for null check
console.log(customer?.birthday?.getFullYear());

//7. Nullish Coaelscing operator

//Falsy values for js(undefined, null, '',false,0)
//*******To be used in cases for checking only for undefined and null
let speed: number | null = null;

let ride = {
  // if speed is not null or undefined use the value otherwise use 30 as default value for speedofVehicle
  speedofVehicle: speed ?? 30,
};

//8. Type assertions
// We tell the typescript compiler that we are more aware about the object that the compiler so define that type of the object

//
let phone = document.getElementById("phone") as HTMLInputElement;
//let phone = <HTMLInputElement> document.getElementById("phone")
phone.value;
//the above statement will give error if we don't tell the compiler that it is a HTMLInputElement and we would become unable to use the property value for the same

//9. Unknown type
//In unknown type, first Narrowing is done, so that we are clear the methods we are calling exist on target objects

// ******* typeof variable - use to type check primitive variables
// ******* variable instanceof ComplexType - used to check for complex types
function render(document: unknown) {
  if (typeof document === "string") document.toUpperCase();
}

//10. never type
//Set "allowUnreachableCode": false in tsconfig for enabling the reporting of unrechable code
function reject(message: string): never {
  throw new Error(message);
}

reject("...");
//console.log("NotRechable")
