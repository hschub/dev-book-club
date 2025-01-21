# Monads

A monad is a design pattern used in functional programming to handle values, especially those involving computations, in a consistent way. It allows for the chaining of operations while managing side effects such as null values, exceptions, or asynchronous computations.

## Key Concepts

1. **Unit (of)**: A function that takes a value and wraps it in a monad.
2. **Bind (flatMap or chain)**: A function that takes a monad and a function, applies the function to the unwrapped value, and returns a new monad.

## Example in TypeScript

Here's a simple example of a `Maybe` monad in TypeScript using functions:

```typescript
type Maybe<T> = { kind: "None" } | { kind: "Some"; value: T };

function of<T>(value: T | null): Maybe<T> {
  return value === null || value === undefined
    ? { kind: "None" }
    : { kind: "Some", value };
}

function isNothing<T>(maybe: Maybe<T>): boolean {
  return maybe.kind === "None";
}

function map<T, U>(maybe: Maybe<T>, fn: (value: T) => U): Maybe<U> {
  if (maybe.kind === "None") {
    return { kind: "None" };
  }
  return of(fn(maybe.value));
}

function flatMap<T, U>(maybe: Maybe<T>, fn: (value: T) => Maybe<U>): Maybe<U> {
  if (maybe.kind === "None") {
    return { kind: "None" };
  }
  return fn(maybe.value);
}

// Usage
const result = flatMap(
  map(of(5), (x) => x * 2),
  (x) => of(x + 1)
);

console.log(result); // { kind: 'Some', value: 11 }
```

In this example, `Maybe` is a monad that helps manage null values. The `map` function applies a function to the value if it exists, and `flatMap` allows chaining of monad-returning functions.
