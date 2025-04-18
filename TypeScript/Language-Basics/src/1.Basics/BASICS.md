# TypeScript Basics and Advanced Features

## Introduction

- TypeScript is a superset of JavaScript that needs to be **transpiled** to JavaScript for browser compatibility.
- It supports **type inference**, allowing variables to implicitly infer their types when possible.

---

## Basic Example

```typescript
console.log("Hello world");

let age: number = 20;
if (age > 50) age += 10;

console.log(age);
```

---

## Built-in Data Types

```typescript
let sales = 123_456_789; // number
let course = "Typescript"; // string
let is_published = true; // boolean
let level; // any (not recommended)

let num_arrays: number[] = [1, 2, 3]; // array
let tuple_example: [number, string] = [1, "tuple"]; // tuple
```

- **Any**: Disables type checking; similar to JS. Avoid its use.
- **Tuple**: Fixed-length arrays with defined types. Note: `push()` still works, which can be a caveat.

---

## Enum

```typescript
const enum Size {
  Small = 1,
  Medium,
  Large,
}

let mySize = Size.Small;
console.log(mySize);
```

- Enum types are usually defined using **PascalCase**.
- Enums get compiled to JavaScript objects; inspect the transpiled output.

---

## Functions

```typescript
function calculateTax(income: number, taxYear = 2022): number {
  if (taxYear > 2022) return income * 1.3;
  return income * 1.2;
}
```

- Always annotate parameter and return types.
- Use `noUnusedLocals`, `noUnusedParameters`, and `noImplicitReturns` in `tsconfig.json` to enforce cleaner code.

---

## Objects

```typescript
let employee: {
  readonly id: number;
  name?: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  retire: (date: Date) => console.log(date),
};
```

- Use `readonly` to prevent reassignment.
- Use `?` for optional properties.

---

## Advanced Types

### 1. Type Alias

```typescript
type Employee = {
  readonly id: number;
  name?: string;
  retire: (date: Date) => void;
};
```

- Creates reusable object shapes.

### 2. Union Type

```typescript
function kgToLbs(weight: number | string) {
  if (typeof weight === "number") return weight * 2.2;
  return parseInt(weight) * 2.2;
}
```

- Accepts multiple types for input.

### 3. Intersection Type

```typescript
type Draggable = { drag: () => void };
type Resizeable = { resize: () => void };
type UIWidget = Draggable & Resizeable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};
```

- Combines multiple types.

### 4. Literal Type

```typescript
type AllowedQuantity = 50 | 100;

let quantity: AllowedQuantity = 50;
```

- Restricts values to specified literals.

### 5. Nullable Types

```typescript
function greet(name: string | null | undefined) {
  if (name) console.log(`Hi ${name.toUpperCase()}`);
  console.log("Hola");
}

greet(null);
greet("Modi");
greet(undefined);
```

- Helps prevent runtime errors with null values.

### 6. Optional Chaining

```typescript
type Customer = { birthday?: Date };

function getCustomerBirthday(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomerBirthday(0);
console.log(customer?.birthday?.getFullYear());
```

- Prevents errors from accessing properties of `null` or `undefined`.

### 7. Nullish Coalescing Operator

```typescript
let speed: number | null = null;

let ride = {
  speedofVehicle: speed ?? 30,
};
```

- Assigns default only if the value is `null` or `undefined`.

### 8. Type Assertions

```typescript
let phone = document.getElementById("phone") as HTMLInputElement;
phone.value;
```

- Tells TypeScript the type when it cannot infer it.

### 9. Unknown Type

```typescript
function render(document: unknown) {
  if (typeof document === "string") document.toUpperCase();
}
```

- Safer than `any`; must do type checks before using the value.

### 10. Never Type

```typescript
function reject(message: string): never {
  throw new Error(message);
}

reject("...");
```

- Represents unreachable code (e.g., after a thrown error).
- Enable `allowUnreachableCode: false` in `tsconfig.json` to detect unreachable code.

---
