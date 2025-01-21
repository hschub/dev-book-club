export function of<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function map<T, U>(
  promise: Promise<T>,
  fn: (value: T) => U
): Promise<U> {
  return promise.then(fn);
}

export function flatMap<T, U>(
  promise: Promise<T>,
  fn: (value: T) => Promise<U>
): Promise<U> {
  return promise.then(fn);
}

// Usage example
const result = flatMap(
  map(of(5), (x) => x * 2),
  (x) => of(x + 1)
);

result.then(console.log); // 11
