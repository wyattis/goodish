import { Emitter } from './Emitter'

function observeObject<T extends object> (obj: object, bus: Emitter): T {

}

function observeArray<T extends any[]> (arr: T, bus: Emitter): T {
  
}

export function Observable<T extends (object | any[])> (value: T): { subject: T, bus: Emitter } {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Can only convert objects and arrays to observable objects')
  }
  const bus = new Emitter()
  const subject: T = Array.isArray(value) ? observeArray(value, bus) : observeObject(value, bus)
  return { bus, subject }
}