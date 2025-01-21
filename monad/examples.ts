import * as Maybe from "./maybe";
import * as Promise from "./promise";
import * as Result from "./result";
import * as Set from "./set";

// Maybe example

const maybeResult = Maybe.flatMap(
  Maybe.map(Maybe.of(5), (x) => x * 2),
  (x) => Maybe.of(x + 1)
);

console.log(maybeResult); // { kind: 'Some', value: 11 }

// Promise example

const promiseResult = Promise.flatMap(
  Promise.map(Promise.of(5), (x) => x * 2),
  (x) => Promise.of(x + 1)
);

promiseResult.then(console.log); // 11

// Result example

const resultResult = Result.flatMap(
  Result.map(Result.ok(5), (x) => x * 2),
  (x) => Result.ok(x + 1)
);

console.log(resultResult); // { kind: 'Ok', value: 11 }

// Set example

const setResult = Set.flatMap(
  Set.map(Set.of(5), (x) => x * 2),
  (x) => Set.of(x + 1)
);

console.log(setResult); // Set { 11 }
