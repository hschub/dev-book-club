export function of<T>(value: T): Set<T> {
  return new Set([value]);
}

export function map<T, U>(set: Set<T>, fn: (value: T) => U): Set<U> {
  const result = new Set<U>();
  set.forEach((value) => result.add(fn(value)));
  return result;
}

export function flatMap<T, U>(set: Set<T>, fn: (value: T) => Set<U>): Set<U> {
  const result = new Set<U>();
  set.forEach((value) => {
    const mappedSet = fn(value);
    mappedSet.forEach((mappedValue) => result.add(mappedValue));
  });
  return result;
}

// Usage example
const result = flatMap(
  map(of(5), (x) => x * 2),
  (x) => of(x + 1)
);

console.log(result); // Set { 11 }
