import { random, randomInt } from './Math'

/**
 * Returns an array of values between the min and max values.
 *
 * ```typescript
 * import { rangeArr } from 'goodish'
 * const arr = rangeArr(0, 5) // [0, 1, 2, 3, 4, 5]
 * ```
 *
 * @param min
 * @param max
 * @param step
 */
export function rangeArr (min: number, max: number, step = 1): number[] {
  return Array.from(range(min, max, step))
}

/**
 * A generator which yields each value between the min and max values
 *
 * ```typescript
 * import { range } from 'goodish'
 * for (const n of range(0, 5)) {
 *   console.log(n) // 0, 1, 2, 3, 4
 * }
 * ```
 * @param min
 * @param max
 * @param step
 */
export function* range (min: number, max: number, step = 1): IterableIterator<number> {
  for (let i = min; i < max; i += step) {
    yield i
  }
}

/**
 * Count the number of items in an iterator
 *
 * ```typescript
 * import { count } from 'goodish'
 * console.log(count([0, 1, 2, 3, 4])) // 5
 * ```
 *
 * @param arr
 */
export function count (arr: Iterable<any>): number {
  let c = 0
  for (const _ of arr) {
    c++
  }
  return c
}

/**
 * Returns a tuple containing a random element from a collection and the index of that element in the collection.
 *
 * ```typescript
 * import { randomFrom, setSeed } from 'goodish'
 * const arr = [0, 1, 2, 3, 4]
 * console.log(randomFrom(arr)) // any single element of arr. will be different each time this code runs
 * setSeed(1)
 * console.log(randomFrom(arr)) // always the same element of arr
 * ```
 * @param arr
 */
export function randomFrom<T> (arr: T[]): [T, number] {
  if (!arr.length) return null
  const index = randomInt(0, arr.length)
  return [arr[index], index]
}

/**
 * Returns an array of N randomly selected elements from the supplied array
 * ```typescript
 * import { randomNFrom, setSeed } from 'goodish'
 * const arr = 'abcdefghijklmnopqrstuvwxyz0123456789'
 * console.log(randomNFrom(arr, 10)) // a random alphanumeric array with 10 characters
 * setSeed(1)
 * console.log(randomNFrom(arr, 10).join('')) // always the same alphanumeric string
 * ```
 * @param arr 
 * @param n 
 */
export function randomNFrom<T> (arr: T[], n: number): T[] {
  if (!arr.length) return []
  const r = []
  for (let i = 0; i < n; i++) {
    const [el, _] = randomFrom(arr)
    r.push(el)
  }
  return r
}

/**
 * Shuffle an array in place.
 *
 * ```typescript
 * import { shuffle, setSeed } from 'goodish'
 * const arr = [0, 1, 2, 3, 4]
 * console.log(shuffle(arr.slice())) // a different array order each time this code is run
 * setSeed(1)
 * console.log(shuffle(arr.slice()) // a different array order, but will be the same each time the code is run
 * ```
 *
 * @param arr
 * @reference Adapted from [here](https://stackoverflow.com/a/6274381/5551941)
 */
export function shuffle<T> (arr: T[]): T[] {
  let m = arr.length
  let t
  let i
  while (m) {
    i = Math.floor(random() * m--)
    t = arr[m]
    arr[m] = arr[i]
    arr[i] = t
  }
  return arr
}

/**
 * A generator which yields all of the permutations of an array
 *
 * ```typescript
 * import { permutationsOf } from 'goodish'
 * console.log(Array.from(permutationsOf([0, 1, 2, 3, 4]))
 * ```
 *
 * @param arr
 * @reference Adapted from [this answer](https://stackoverflow.com/a/37580979/5551941)
 */
export function* permutationsOf<T> (arr: T[]): IterableIterator<T[]> {
  const permutation = arr.slice(0)
  const c = Array(arr.length).fill(0)
  let i = 1
  let k
  let p
  yield permutation.slice()
  while (i < arr.length) {
    if (c[i] < i) {
      k = i % 2 && c[i]
      p = permutation[i]
      permutation[i] = permutation[k]
      permutation[k] = p
      c[i]++
      i = 1
      yield permutation.slice()
    } else {
      c[i] = 0
      i++
    }
  }
}

/**
 * A generator which yields all of the combinations of N items from an array.
 *
 * ```typescript
 * import { combinationsOf } from 'goodish'
 * console.log(Array.from(combinationsOf([0, 1, 2], 2)) // [[0, 1], [0, 2], [1, 2]]
 * ```
 *
 * @param arr
 * @param n
 * @reference Copied verbatim from [this site](https://lowrey.me/es6-javascript-combination-generator/)
 */
export function* combinationsOf<T> (arr: T[], n: number): IterableIterator<T[]> {
  for (let i = 0; i < arr.length; i++) {
    if (n === 1) {
      yield [arr[i]]
    } else {
      let remaining = combinationsOf(arr.slice(i + 1, arr.length), n - 1)
      for (let next of remaining) {
        yield [arr[i], ...next]
      }
    }
  }
}

/**
 * Swap two indexes of an array
 *
 * ```typescript
 * import { swap } from 'goodish'
 * const arr = [0, 1, 2]
 * swap(1, 2)
 * console.log(arr) // [0, 2, 1]
 * ```
 *
 * @param arr
 * @param indexA
 * @param indexB
 */
export function swap<T> (arr: T[], indexA: number, indexB: number): T[] {
  const v = arr[indexA]
  arr[indexA] = arr[indexB]
  arr[indexB] = v
  return arr
}

/**
 * Transpose a 2D array.
 *
 * ```typescript
 * import { transpose } from 'goodish'
 * console.log(transpose([[0], [1], [2]])) // [[0, 1, 2]]
 * ```
 *
 * @param arr
 * @reference Copied verbatim from [this answer](https://stackoverflow.com/a/17428705/5551941)
 */
export function transpose<T> (arr: T[][]): T[][] {
  return arr[0].map((col, i) => arr.map(row => row[i]))
}
