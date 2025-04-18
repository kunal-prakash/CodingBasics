
# TypeScript Generics: Detailed Notes

## Problem It Solves

Consider the following two classes:

```ts
class keyValuePair {
  constructor(public key: number, public value: string) {}
}

class StringKeyValuePair {
  constructor(public key: string, public value: string) {}
}
```

This approach leads to code duplication. **Generics** solve this problem by allowing us to create a class that works with multiple types while maintaining type safety and flexibility.

## Generic Class

```ts
class KeyValuePair<T, U> {
  constructor(public key: T, public value: U) {}
}

let pair = new KeyValuePair<number, string>(1, "Kunal");
let pair2 = new KeyValuePair("1", "Kunal");
```

## Generic Function

```ts
class ArrayUtils {
  static wrapInArray<T>(value: T) {
    return [value];
  }
}

let numbers = ArrayUtils.wrapInArray<number>(1);
let strings = ArrayUtils.wrapInArray<string>("Hello");
```

## Generic Interface

```ts
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
```

## Generic Constraints

```ts
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

const echo3 = <T extends PersonInterface>(value: T) => value;
echo3({ name: 1 });

class PersonClass {
  constructor(public name: string) {}
}

class EmployeeClass extends PersonClass {
  constructor(name: string, public department: string) {
    super(name);
  }
}

const echo4 = <T extends PersonClass>(value: T) => value;
echo4(new PersonClass("John"));
echo4(new EmployeeClass("John", "Engineering"));
```

## Extending Generic Classes

```ts
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

class CompressibleStore<T> extends Store<T> {
  compress() {
    console.log("Compressing...");
  }
}

let compressibleStore = new CompressibleStore<ProductInterface>();
compressibleStore.add({ name: "Product 1", price: 100 });
compressibleStore.compress();

class SearchableStore<T extends { name: string }> extends Store<T> {
  find(name: string): T | undefined {
    return this._objects.find(obj => obj.name === name);
  }
}

class ProductStore extends Store<ProductInterface> {
  filterByCategory(category: string) {
    return this._objects.filter(obj => obj.category === category);
  }
}

let productStore = new ProductStore();
productStore.add({ name: "Product 1", price: 100, category: "Electronics" });
productStore.filterByCategory("Electronics");
```

## keyof Operator

```ts
class Store2<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }

  find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find(obj => obj[property] === value);
  }
}

let store2 = new Store2<ProductInterface>();
store2.add({ name: "Product 1", price: 100 });
store2.find("name", "Product 1");
```

## Type Mapping

To resolve the issue of readonly properties:

```ts
interface Products {
  name: string;
  price: number;
}

type ReadOnlyProducts = {
  readonly name: string;
  readonly price: number;
};
```

Using type mapping:

```ts
type ReadOnlyProducts2 = {
  readonly [K in keyof Products]: Products[K];
};

let product: ReadOnlyProducts2 = {
  name: "Product 1",
  price: 100,
};

// Error: product.name = "Product 2"
```

## Utility Types in TypeScript

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```
