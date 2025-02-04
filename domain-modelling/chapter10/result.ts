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

// Example one track to two track functions

function isPositive(n: number): Result<number> {
  return n >= 0 ? ok(n) : err("Number is not positive");
}

function isEven(n: number): Result<number> {
  return n % 2 === 0 ? ok(n) : err("Number is not even");
}

// What we want:

// function isPositive$(result: Result<number>): Result<number> {
//   if (result.kind === "Error") {
//     return result;
//   }
//   return result.value >= 0 ? ok(result.value) : err("Number is not positive");
// }

// function isEven$(result: Result<number>): Result<number> {
//   if (result.kind === "Error") {
//     return result;
//   }
//   return result.value % 2 === 0 ? ok(result.value) : err("Number is not even");
// }

// Adapter

function toBind<T0, T1>(fn: (value: T0) => Result<T1>) {
  return (result: Result<T0>): Result<T1> => {
    return result.kind === "Ok" ? fn(result.value) : result;
  };
}

const isPositive$ = toBind(isPositive);
const isEven$ = toBind(isEven);

// Example

const result0 = ok(42);
const result1 = isPositive$(result0);
const result2 = isEven$(result1);

// const f = compose(isPositive$, isEven$);
// const result = f(ok(42));

// console.log(result2);
// const result = isEven$(isPositive$(ok(42)));
