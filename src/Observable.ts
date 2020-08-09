import { Emitter } from './Emitter'


/**
 *
 * @private
 * @template T
 * @param {T} obj
 * @param {Emitter} bus
 * @param {string[]} [path=[]]
 * @returns {T}
 */
function observeObject<T extends object> (obj: T, bus: Emitter, path: string[] = []): T {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        // @ts-ignore
        obj[key] = observeArray(obj[key], bus, path.concat([key]))
      } else {
        // @ts-ignore
        obj[key] = observeObject(obj[key], bus, path.concat([key]))
      }
    }
  }
  return new Proxy(obj, {
    set (obj: T, prop: keyof T, value: any) {
      const p = path.concat([prop] as string[])
      console.log('set', obj, p, value)
      if (obj[prop] === undefined) {
        bus.emit('added', p, value)
      } else if (value !== obj[prop]) {
        bus.emit('changed', p, value)
      }
      obj[prop] = value
      return true
    },
    deleteProperty (obj: T, prop: keyof T) {
      bus.emit('deleted', path.concat([prop] as string[]))
      const propExists = obj[prop] !== undefined
      delete obj[prop]
      return propExists
    }
  }) as T
}

/**
 *
 * @private
 * @template T
 * @param {T} arr
 * @param {Emitter} bus
 * @param {string[]} [path=[]]
 * @returns {T}
 */
function observeArray<T extends any[]> (arr: T, bus: Emitter, path: string[] = []): T {
  return observeObject(arr, bus, path)
}


/**
 * Returns a proxied object and an emitter which will emit 'added', 'changed' and 'deleted' events
 * whenever changes are made to the returned proxy. Useful for a simple state store.
 * 
 ```typescript
 * import { Observable } from 'goodish'
 * const [o, bus] = Observable({ a: 1 })
 * 
 * bus.on('added', (path: string[], value: any) => {})
 * bus.on('deleted', (path: string[]) => {})
 * bus.on('changed', (path: string[], value: any) => {})
 * 
 * o.b = 2          // Fires 'added' event
 * o.a = 2          // Fires 'changed' event
 * delete o.a       // Fires 'deleted' event
 * o.a = undefined  // Fires 'deleted' event
 * ```
 *
 * @param value
 * 
 */
export function Observable<T extends (object | any[])> (value: T): [T, Emitter] {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Can only convert objects and arrays to observable objects')
  }
  const bus = new Emitter()
  const subject: T = Array.isArray(value) ? observeArray(value, bus) : observeObject(value, bus)
  return [subject, bus]
}