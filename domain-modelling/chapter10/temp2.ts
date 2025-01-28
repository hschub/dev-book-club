// Result

export type Result<T> =
  | { kind: "Ok"; value: T }
  | { kind: "Error"; reason: string };

function ok<T>(value: T): Result<T> {
  return { kind: "Ok", value };
}

function err<T>(reason: string): Result<T> {
  return { kind: "Error", reason };
}

// Utility functions (design pattern)

function map<T0, T1>(
  result: Result<T0>,
  fn: (value: T0) => Result<T1>
): Result<T1> {
  return result.kind === "Ok" ? fn(result.value) : result;
}

function bind<T0, T1>(
  result: Result<T0>,
  fn: (value: Result<T0>) => Result<T1>
): Result<T1> {
  return result.kind === "Ok" ? fn(result) : result;
}

// Usage

// TODO

// Adapter function

function toBind<T0, T1>(
  fn: (value: T0) => Result<T1>
): (result: Result<T0>) => Result<T1> {
  return (result: Result<T0>): Result<T1> => {
    return result.kind === "Ok" ? fn(result.value) : result;
  };
}

// Examples

function isPositive(n: number): Result<number> {
  return n >= 0 ? ok(n) : err("Number is not positive");
}

function isEven(n: number): Result<number> {
  return n % 2 === 0 ? ok(n) : err("Number is not even");
}

// Examples as "bind" functions

function isPositive$(result: Result<number>): Result<number> {
  return result.kind === "Ok" ? isPositive(result.value) : result;
}

function isEven$(result: Result<number>): Result<number> {
  return result.kind === "Ok" ? isEven(result.value) : result;
}

// Using "toBind" adapter function

const isPositive$$ = toBind(isPositive);
const isEven$$ = toBind(isEven);

// Usage

const r0 = ok(3);
const r1 = isPositive$(r0);
const r2 = isEven$(r1);

console.log(r2);

// Pipe function

function compose<T0, T1, T2>(
  f1: (value: T0) => Result<T1>,
  f2: (value: T1) => Result<T2>
): (value: T0) => Result<T2> {
  const f1$ = toBind(f1);
  const f2$ = toBind(f2);
  return (value: T0) => {
    const r0 = ok(value);
    const r1 = f1$(r0);
    const r2 = f2$(r1);
    return r2;
  };
}

const compose3 = <T0, T1, T2, T3>(
  f1: (value: T0) => Result<T1>,
  f2: (value: T1) => Result<T2>,
  f3: (value: T2) => Result<T3>
): ((value: T0) => Result<T3>) => {
  const f$ = compose(f1, f2);
  return compose(f$, f3);
};

const compose4 = <T0, T1, T2, T3, T4>(
  f1: (value: T0) => Result<T1>,
  f2: (value: T1) => Result<T2>,
  f3: (value: T2) => Result<T3>,
  f4: (value: T3) => Result<T4>
): ((value: T0) => Result<T4>) => {
  const f$ = compose3(f1, f2, f3);
  return compose(f$, f4);
};

// Usage

const isPositiveAndEven = compose(isPositive, isEven);
