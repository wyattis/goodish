export type Comparator<T> = (a: T, b: T) => boolean
function defaultComparator (a: any, b: any) {
  return a === b
}

/**
 * Returns the intersection between to sets
 * @param setA 
 * @param setB 
 * @param comparator 
 */
export function intersection<T> (setA: T[], setB: T[], comparator: Comparator<T> = defaultComparator): T[] {
  return setA.filter(a => setB.find(b => comparator(a, b)))
}

/**
 * Returns the union of two sets
 * @param setA 
 * @param setB 
 * @param comparator 
 */
export function union<T> (setA: T[], setB: T[], comparator: Comparator<T> = defaultComparator): T[] {
  return setA.filter(a => !setB.find(b => comparator(a, b))).concat(setB)
}

/**
 * Returns the left difference between two sets. This will keep values that exist in setA which do not exist in setB
 * @param setA 
 * @param setB 
 * @param comparator 
 */
export function difference<T> (setA: T[], setB: T[], comparator: Comparator<T> = defaultComparator): T[] {
  return setA.filter(a => !setB.find(b => comparator(a, b)))
}

/**
 * Returns the right difference between two sets. This will keep values that exist in setB which do not exist in setA
 * @param setA 
 * @param setB 
 * @param comparator 
 */
export function rightDifference<T> (setA: T[], setB: T[], comparator: Comparator<T> = defaultComparator): T[] {
  return difference(setB, setA, comparator)
}

/**
 * Will return the complete set of values that exist in either setA or setB, but not both.
 * @param setA 
 * @param setB 
 * @param comparator 
 */
export function exclusiveOr<T> (setA: T[], setB: T[], comparator: Comparator<T> = defaultComparator): T[] {
  return difference(setA, setB, comparator).concat(rightDifference(setA, setB, comparator))
}