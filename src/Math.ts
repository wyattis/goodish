/**
 * @private
 */
let rng: () => number = Math.random

/**
 * Simple seedable Psuedo random number generator
 * @private
 */
function makePRNG (seed = 1) {
  seed = seed * 16807 % 2147483647
  function prng (): number {
    seed = seed * 16807 % 2147483647
    return (seed - 1) / 2147483646
  }
  rng = prng
}

/**
 * Set the seed for our prng and switch to a simple, seedable prng
 *
 * ```typescript
 * import { randomInt, setSeed } from 'goodish'
 * setSeed(11)
 * randomInt(1, 100) // always 44
 * ```
 *
 * @param seed
 */
export function setSeed (seed: number) {
  makePRNG(seed)
}

/**
 * Remove any previously set seed on the random number generator
 *
 * ```typescript
 * import { clearSeed } from 'goodish'
 * clearSeed() // Now randomized functions will use Math.random again
 * ```
 */
export function clearSeed () {
  rng = Math.random
}

/**
 * Returns a random float between min and max.
 *
 * ```typescript
 * import { random } from 'goodish'
 * console.log(random()) // value between 0 and 1
 * console.log(random(0, 100) // value between 0 and 100
 *
 * @param min
 * @param max
 */
export function random (min: number = 0, max: number = 1): number {
  return rng() * (max - min) + min
}

/**
 * Returns a random integer between the min and max values.
 *
 * ```typescript
 * import { randomInt } from 'goodish'
 * console.log(randomInt(0, 100)) // Some integer between 0 and 100
 * ```
 *
 * @param min
 * @param max
 */
export function randomInt (min: number, max: number): number {
  return Math.floor(random(min, max))
}

/**
 * Round a number to the specified number of digits
 *
 * ```typescript
 * import { toFixedNum } from 'goodish'
 * console.log(toFixedNum(3.14159, 2)) // 3.14
 * ```
 *
 * @param float
 * @param digits
 */
export function toFixedNum (float: number, digits: number): number {
  return Math.floor(float * Math.pow(10, digits)) / Math.pow(10, digits)
}

/**
 * Calculate the greatest common divisor of two numbers
 *
 * ```typescript
 * import { greatestCommonDivisor } from 'goodish'
 * console.log(greatestCommonDivisor(18, 12)) // 6
 * ```
 *
 * @param numA
 * @param numB
 * @reference Adapted from [this site](https://www.w3resource.com/javascript-exercises/javascript-math-exercise-8.php)
 */
export function greatestCommonDivisor (numA: number, numB: number): number {
  numA = Math.abs(numA)
  numB = Math.abs(numB)
  if (numA !== Math.floor(numA) || numB !== Math.floor(numB)) {
    throw new Error('Greatest common divisor can only be found for integers')
  }
  while (numB) {
    const t = numB
    numB = numA % numB
    numA = t
  }
  return numA
}

/**
 * Calculate the lowest common multiple of two numbers
 *
 * ```typescript
 * import { lowestCommonMultiple } from 'goodish'
 * console.log(lowestCommonMultiple(6, 8)) // 24
 * ```
 *
 * @param numA
 * @param numB
 * @reference Adapted from [this site](https://www.w3resource.com/javascript-exercises/javascript-math-exercise-10.php)
 */
export function lowestCommonMultiple (numA: number, numB: number): number {
  numA = Math.abs(numA)
  numB = Math.abs(numB)
  if (numA !== Math.floor(numA) || numB !== Math.floor(numB)) {
    throw new Error('Lowest common multiple can only be found for integers')
  }
  return (!numA || !numB) ? 0 : Math.abs((numA * numB) / greatestCommonDivisor(numA, numB))
}

/**
 * Clamp a value between the min and max values. If it is below min or above max then we set the value equal to the
 * respective boundary.
 *
 * ```typescript
 * import { clamp } from 'goodish'
 * console.log(clamp(100, 0, 10)) // 10
 * ```
 *
 * @param val
 * @param min
 * @param max
 */
export function clamp (val: number, min: number, max: number): number {
  if (val < min) {
    return min
  } else if (val > max) {
    return max
  } else {
    return val
  }
}

/**
 * Wrap the value within these bounds. More explanation of the idea (here)[https://en.wikipedia.org/wiki/Wrapping_(graphics)]
 *
 * ```typescript
 * import { wrap } from 'goodish'
 * console.log(wrap(5, 1, 4)) // 2 because value exceeds the max val by 1 and wraps around from the lower boundary
 * ```
 *
 * @param val
 * @param min
 * @param max
 */
export function wrap (val: number, min: number, max: number): number {
  if (val < min) {
    return max - ((min - val) % (max - min))
  } else if (val > max) {
    return min + ((val - max) % (max - min))
  } else {
    return val
  }
}
