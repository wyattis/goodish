/**
 * Create a shallow copy of objects with support for blocking properties and allowing properties
 *
 * @export
 * @template T
 * @param {T} obj
 * @param {Partial<{ allowed: string[], blocked: string [] }>} [opts]
 * @returns {Partial<T>}
 */
export function copyProps<T extends object = object> (obj: T, opts?: { allowed: string[] } | { blocked: string [] }): Partial<T> {
  if (opts) {
    if ('allowed' in opts && 'blocked' in opts) {
      throw new Error(`Cannot have both 'allowed' and 'blocked' options provided`)
    }
    let res: Partial<T> = {}
    for (const key in obj) {
      let shouldCopyKey = true
      if ('allowed' in opts && !opts.allowed.includes(key)) {
        shouldCopyKey = false
      }
      if (!shouldCopyKey || ('blocked' in opts && opts.blocked.includes(key))) {
        shouldCopyKey = false
      }
      if (shouldCopyKey) {
        res[key] = obj[key]
      }
    }
    return res
  }
  return Object.assign({}, obj)
}