/**
 * An asynchronous wait function. Just useful for throttling purposes.
 * @param ms  - The number of milliseconds to wait before resolving the promise
 */
export function wait (ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

/**
 * A shared throttle. Safe to be used by multiple asynchronous requests at the same time.
 * @param freq - The number of milliseconds between resolution of this function
 */
export function throttler (freq: number): Function {
  const Mutex = require('async-mutex').Mutex
  const mutex = new Mutex()
  
  return async function () {
    const release = await mutex.acquire()
    try {
      await wait(freq)
    } finally {
      release()
    }
  }

}