# good
A collection of utility functions like common Math functions and common iterator operations written in TypeScript. This
library supports tree shaking when used with build tools which support it.

## Math
A collection of common math functions with min/max support such as `random(min, max)` and `randomInt(min, max)`. These 
functions use `Math.random` by default for number generation, but can be seeded using the `setSeed(someNumber)` method.
Setting the seed will affect all of the functions in this library which rely on the RNG. Use `clearSeed` to reset back
to the default `Math.random` PRNG.

## Iteration
A collection of common methods performed on arrays such as `range(min, max, step)`, `shuffle(arr)`, `randomFrom(arr)`, 
`permutationsOf(arr)`, `combinationsOf(arr, n)` and `swap(arr, indexA, indexB)`.


### TODO
#### Chores
- [x] Finish writing tests
- [ ] Automatically generate docs
- [ ] Examples

#### Additions
- [ ] Iterate through an array randomly with minimal memory usage (potentially using 
      [this](https://en.wikipedia.org/wiki/Linear_congruential_generator) method)
