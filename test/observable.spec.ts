import { expect } from 'chai'
import 'mocha'
import { Observable } from '../dist/Observable'

describe('Observable', () => {

  it('should not change the object', () => {
    const [o] = Observable({
      a: 1,
      b: 2,
      n: {
        a: 4
      }
    })
    expect(o.a).to.equal(1)
    expect(o.b).to.equal(2)
    expect(o.n.a).to.equal(4)
  })
  it('should emit when adding properties', (done) => {
    const [o, bus] = Observable({
      a: 1,
    }) as any
    bus.on('added', (prop: string, value: number) => {
      expect(prop).to.deep.equal(['b'])
      expect(value).to.equal(2)
      done()
    })
    o.b = 2
  })
  it('should emit when changing props', (done) => {
    const [o, bus] = Observable({
      a: 1
    })
    bus.on('changed', (prop: string, value: number) => {
      expect(prop).to.deep.equal(['a'])
      expect(value).to.equal(2)
      done()
    })
    o.a = 2
  })
  it('should emit when removing props', (done) => {
    const [o, bus] = Observable({
      a: 1
    })
    bus.on('deleted', (prop: string) => {
      expect(prop).to.deep.equal(['a'])
      done()
    })
    delete o.a
  })
  it('should handle nested objects', (done) => {
    const [o, bus] = Observable({
      a: {
        b: 2
      }
    }) as any
    bus.on('added', (path: string[], value: any) => {
      expect(path).to.deep.equal(['a', 'c'])
      expect(value).to.equal(4)
      done()
    })
    o.a.c = 4
  })
  it('should only emit if the value has changed', () => {
    const [o, bus] = Observable({
      a: 1
    })
    let c = 0
    bus.on('changed', () => c++)
    o.a = 2
    o.a = 2
    expect(c).to.equal(1)
  })
  it('should handle arrays', (done) => {
    const [o, bus] = Observable({
      a: [0, 1]
    })
    bus.on('added', (path: string[], value: number) => {
      expect(path).to.deep.equal(['a', '2'])
      expect(value).to.equal(2)
      done()
    })
    o.a.push(2)
  })
  it('should keep methods on objects', () => {
    const [o] = Observable({
      a: 1,
      b () {
        return 'wow'
      }
    })
    expect(o.b).to.not.throw()
    expect(o.b()).to.equal('wow')
  })
  it('should proxy objects that are added to the target', (done) => {
    const [o, bus] = Observable({}) as any
    o.a = { b: 2 }
    bus.on('changed', (path: string[], value: any) => {
      expect(path).to.deep.equal(['a', 'b'])
      done()
    })
    o.a.b = 3
  })

})