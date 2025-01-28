export type Result<T> =
  | { kind: "Ok"; value: T }
  | { kind: "Error"; reason: string };

function ok<T>(value: T): Result<T> {
  return { kind: "Ok", value };
}

function err<T>(reason: string): Result<T> {
  return { kind: "Error", reason };
}

// Functions

function isPositive(value: number): Result<number> {
  return value >= 0 ? ok(value) : err("Value is not positive");
}

function isEven(value: number): Result<number> {
  return value % 2 === 0 ? ok(value) : err("Value is not even");
}

// Bind functions

function isPositive$(result: Result<number>): Result<number> {
  return result.kind === "Ok" ? isPositive(result.value) : result;
}

function isEven$(result: Result<number>): Result<number> {
  return result.kind === "Ok" ? isEven(result.value) : result;
}

function bind<T, U>(fn: (value: T) => Result<U>) {
  return (result: Result<T>): Result<U> => {
    if (result.kind === "Ok") {
      return fn(result.value);
    } else {
      return result;
    }
  };
}

function map<T, U>(fn: (value: T) => U) {
  return (result: Result<T>): Result<U> => {
    if (result.kind === "Ok") {
      return ok(fn(result.value));
    } else {
      return result;
    }
  };
}

const isPositive$$ = bind(isPositive);
const isEven$$ = bind(isEven);

// Example

const isPositiveAndEven$ = (value: number) => {
  const r1 = ok(value);
  const r2 = isPositive$(r1);
  const r3 = isEven$(r2);
  return r3;
};

const isPositiveAndEven$$ = (value: number) => {
  const r1 = ok(value);
  const r2 = isPositive$$(r1);
  const r3 = isEven$$(r2);
  return r3;
};
