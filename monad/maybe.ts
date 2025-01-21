type Maybe<T> = { kind: "None" } | { kind: "Some"; value: T };

export function of<T>(value: T | null): Maybe<T> {
  return value === null || value === undefined
    ? { kind: "None" }
    : { kind: "Some", value };
}

export function isNone<T>(maybe: Maybe<T>): boolean {
  return maybe.kind === "None";
}

export function isSome<T>(maybe: Maybe<T>): boolean {
  return maybe.kind === "Some";
}

export function map<T, U>(maybe: Maybe<T>, fn: (value: T) => U): Maybe<U> {
  if (maybe.kind === "None") {
    return { kind: "None" };
  }
  return of(fn(maybe.value));
}

export function flatMap<T, U>(
  maybe: Maybe<T>,
  fn: (value: T) => Maybe<U>
): Maybe<U> {
  if (maybe.kind === "None") {
    return { kind: "None" };
  }
  return fn(maybe.value);
}

// Usage example
const result = flatMap(
  map(of(5), (x) => x * 2),
  (x) => of(x + 1)
);

console.log(result); // { kind: 'Some', value: 11 }
