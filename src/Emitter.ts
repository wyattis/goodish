type EventCallback = {
  callback: any
  context: any
}


/**
 * A simple event emitter interface for sending arbitrary events to any number of listeners.
 *
 * ```typescript
 * import { Emitter } from 'goodish'
 * const bus = new Emitter()
 * bus.on('hello', (msg: string) => {
 *   console.log('hello', msg)
 * })
 * bus.emit('hello', 'world')
 * // # 'hello world' logged in console
 * ```
 *
 * @export
 * @class Emitter
 */
export class Emitter {
  private eventCallbacks: {[key: string]: EventCallback[]} = {}

  /**
   * Register an event type by name. This method is called when the 'on' method is called if an event of that type has
   * not been registered yet.
   * @param eventName
   */
  register (eventName: string) {
    if (this.eventCallbacks[eventName]) {
      throw Error('An event with this name has already been registered: ' + eventName)
    }
    this.eventCallbacks[eventName] = []
  }

  /**
   * Add an event callback with optional context
   * @param eventName
   * @param callback
   * @param context
   */
  on (eventName: string, callback: Function, context?: object) {
    if (!this.eventCallbacks[eventName]) {
      this.register(eventName)
    }
    this.eventCallbacks[eventName].unshift({
      callback: callback,
      context: context
    })
  }

  /**
   * Remove an event callback by reference
   * @param eventName
   * @param [callback]
   * @param [force=false]
   */
  off (eventName: string): void
  off (eventName: string, callback: Function): void
  off (eventName: string, callback: Function, force: boolean): void
  off (eventName: string, callback?: Function, force: boolean = false) {
    if (!this.eventCallbacks[eventName]) {
      if (force) return
      throw Error('An event with this name has not been registered yet: ' + eventName)
    }
    if (callback) {
      let cbInd = this.eventCallbacks[eventName].findIndex(cb => cb.callback === callback)
      this.eventCallbacks[eventName].splice(cbInd, 1)
    } else {
      this.eventCallbacks[eventName] = []
    }
  }

  /**
   * Dispatch an event with eventName using the 'call' method
   * @param eventName
   * @param args
   */
  dispatch (eventName: string, ...args: any[]) {
    if (this.eventCallbacks[eventName]) {
      let i = this.eventCallbacks[eventName].length
      while (i--) {
        this.eventCallbacks[eventName][i].callback.call(this.eventCallbacks[eventName][i].context, ...args)
      }
    }
  }

  /**
   * Dispatch an event with eventName using the 'apply' method
   * @param eventName
   * @param args
   */
  dispatchApply (eventName: string, args: any[] = []) {
    if (this.eventCallbacks[eventName]) {
      let i = this.eventCallbacks[eventName].length
      while (i--) {
        this.eventCallbacks[eventName][i].callback.apply(this.eventCallbacks[eventName][i].context, args)
      }
    }
  }

  /**
   * Alias for the dispatch method
   * @param eventName
   * @param args
   */
  emit (eventName: string, ...args: any[]) {
    this.dispatch(eventName, ...args)
  }

  /**
   * Remove all listeners from this instance
   */
  removeListeners () {
    this.eventCallbacks = {}
  }

  /**
   * Getter to check if any listeners are present on this emitter
   */
  hasListeners (): boolean {
    for (let key in this.eventCallbacks) {
      if (this.eventCallbacks[key].length) {
        return true
      }
    }
    return false
  }
}
