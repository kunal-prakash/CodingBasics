//Problem it solves
class keyValuePair {
  constructor(public key: number, public value: string) {}
}

class StringKeyValuePair {
  constructor(public key: string, public value: string) {}
}
//Generics solve this problem by allowing us to create a generic class that can work with multiple types while keeping the type safety and flexibility
//Generics are defined using angle brackets <>

//Generic Class
class KeyValuePair<T, U> {
  constructor(public key: T, public value: U) {}
}

let pair = new KeyValuePair<number, string>(1, "Kunal");
let pair2 = new KeyValuePair("1", "Kunal");

//Generic Function
class ArrayUtils {
  static wrapInArray<T>(value: T) {
    return [value];
  }
}

let numbers = ArrayUtils.wrapInArray<number>(1);
let strings = ArrayUtils.wrapInArray<string>("Hello");

//Generic Interface
//https://mywebsite.com/users
//https://mywebsite.com/products
interface Result<T> {
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): Result<T> {
  return { data: null, error: null };
}

interface User {
  username: string;
}

interface Product {
  id: number;
}

let result = fetch<User>("https://mywebsite.com/users");
result.data?.username;

let result2 = fetch<Product>("https://mywebsite.com/products");
result2.data?.id;

//Generic Constraints
function echo<T extends string | number>(value: T): T {
  return value;
}

function echo2<T extends { name: string }>(value: T): T {
  return value;
}

let echoResult = echo("Hello");
let echoResult2 = echo(1);

let echoResult3 = echo2({ name: "John" });

interface PersonInterface {
  name: number;
}

const echo3 = <T extends PersonInterface>(value: T) => {
  return value;
};

echo3({ name: 1 });

class PersonClass {
  constructor(public name: string) {}
}

class EmployeeClass extends PersonClass {
  constructor(name: string, public department: string) {
    super(name);
  }
}

const echo4 = <T extends PersonClass>(value: T) => {
  return value;
};

echo4(new PersonClass("John"));
echo4(new EmployeeClass("John", "Engineering"));

//Extending Generic Classes
interface ProductInterface {
  name: string;
  price: number;
  category?: string;
}

class Store<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }
}

//pass on the generic type parameter
class CompressibleStore<T> extends Store<T> {
  compress() {
    console.log("Compressing...");
  }
}

let compressibleStore = new CompressibleStore<ProductInterface>();
compressibleStore.add({ name: "Product 1", price: 100 });
compressibleStore.compress();

//restrict the generic type parameter
class SearchableStore<T extends { name: string }> extends Store<T> {
  find(name: string): T | undefined {
    return this._objects.find((obj) => obj.name === name);
  }
}

//fix the generic type parameter
class ProductStore extends Store<ProductInterface> {
  filterByCategory(category: string) {
    return this._objects.filter((obj) => obj.category === category);
  }
}

let productStore = new ProductStore();
productStore.add({ name: "Product 1", price: 100, category: "Electronics" });
productStore.filterByCategory("Electronics");

//keyof operator

class Store2<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }
  find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find((obj) => obj[property] === value);
  }
}
//If T is ProductInterface, then keyof T is "name" | "price" | "category"
let store2 = new Store2<ProductInterface>();
store2.add({ name: "Product 1", price: 100 });
store2.find("name", "Product 1");

// type mapping-> to resolve the issue of readonly properties
interface Products {
  name: string;
  price: number;
}

type ReadOnlyProducts = {
  readonly name: string;
  readonly price: number;
};
//--Solution
type ReadOnlyProducts2 = {
  //Index Signature
  //keyof
  readonly [K in keyof Products]: Products[K];
};

let product: ReadOnlyProducts2 = {
  name: "Product 1",
  price: 100,
};

//Error ----product.name = "Product 2"

//Generics for the same in typescript
// /**
//  * Make all properties in T optional
//  */
// type Partial<T> = {
//     [P in keyof T]?: T[P];
// };

// /**
//  * Make all properties in T required
//  */
// type Required<T> = {
//     [P in keyof T]-?: T[P];
// };

// /**
//  * Make all properties in T readonly
//  */
// type Readonly<T> = {
//     readonly [P in keyof T]: T[P];
// };
