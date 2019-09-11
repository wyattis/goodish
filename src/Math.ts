// Simple seedable Psuedo random number generator
let seed = 1
let rng: () => number = Math.random
function prng (): number {
  seed = seed * 16807 % 2147483647
  return (seed - 1) / 2147483646
}

/**
 * Set the seed for our prng
 * @param seed
 */
export function setSeed (v: number) {
  seed = v
  rng = prng
}

/**
 * Remove any previously set seed on the random number generator
 */
export function clearSeed () {
  seed = 1
  rng = Math.random
}

/**
 * Returns a random float between min and max.
 * @param min
 * @param max
 */
export function random (min: number = 0, max: number = 1): number {
  return rng() * (max - min) + min
}

/**
 * Returns a random integer between the min and max values.
 * @param min
 * @param max
 */
export function randomInt (min: number, max: number): number {
  return Math.floor(random(min, max))
}

/**
 * Round a number to the specified number of digits
 * @param float
 * @param digits
 */
export function toFixedNum (float: number, digits: number): number {
  return Math.floor(float * Math.pow(10, digits)) / Math.pow(10, digits)
}

/**
 * Calculate the greatest common divisor of two numbers
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
 * Ex:
 *   val: 5, min: 1, max: 4
 *   returned val is 2 because the value exceeds the max val by 1
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
