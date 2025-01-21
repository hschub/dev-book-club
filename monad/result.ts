export type Result<T, E> =
  | { kind: "Ok"; value: T }
  | { kind: "Error"; error: E };

export function ok<T, E>(value: T): Result<T, E> {
  return { kind: "Ok", value };
}

export function error<T, E>(error: E): Result<T, E> {
  return { kind: "Error", error };
}

export function isOk<T, E>(result: Result<T, E>): boolean {
  return result.kind === "Ok";
}

export function isError<T, E>(result: Result<T, E>): boolean {
  return result.kind === "Error";
}

export function map<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  if (result.kind === "Error") {
    return result;
  }
  return ok(fn(result.value));
}

export function flatMap<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  if (result.kind === "Error") {
    return result;
  }
  return fn(result.value);
}

// Usage example
const result = flatMap(
  map(ok<number, string>(5), (x) => x * 2),
  (x) => ok<number, string>(x + 1)
);

console.log(result); // { kind: 'Ok', value: 11 }
