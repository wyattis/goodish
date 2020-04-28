import { expect } from 'chai'
import 'mocha'
import {
  clamp, clearSeed,
  greatestCommonDivisor,
  lowestCommonMultiple,
  random,
  randomInt,
  setSeed,
  toFixedNum,
  wrap
} from '../dist'

describe('Math helpers', () => {
  describe('seeding', () => {
    it('should obey a seed once the seed is set', () => {
      setSeed(1)
      expect(randomInt(1, 10000)).to.eql(1316)
      clearSeed()
      expect(randomInt(1, 10000)).to.not.eql(1316)
    })
  })
  describe('random', () => {
    it('should return a value between 0 and 1 by default', () => {
      expect(random()).to.be.lessThan(1).and.greaterThan(0)
    })
    it('should return a value between min and max', () => {
      const tests = [
        [10, 100],
        [5, 6],
        [5.2, 5.21]
      ]
      for (const [min, max] of tests) {
        expect(random(min, max)).to.be.lessThan(max).and.greaterThan(min)
      }
    })
  })
  describe('randomInt', () => {
    it('should return an integer between min and max', () => {
      const tests = [
        [0, 10],
        [-10000, 10000],
        [4000, 4002]
      ]
      for (const [min, max] of tests) {
        const val = randomInt(min, max)
        const res = val >= min && val < max
        expect(res, `Expected ${val} to be within [${min}, ${max})`).to.be.true
      }
    })
  })
  describe('toFixedNum', () => {
    it('should round to decimal places correctly', () => {
      const tests = [
        [3.14159, 2, 3.14],
        [1.618, 2, 1.61],
        [12.656, 1, 12.6],
        [15.111, 3, 15.111]
      ]
      for (const [num, n, res] of tests) {
        expect(toFixedNum(num, n)).to.eql(res)
      }
    })
  })
  describe('greatestCommonDivisor', () => {
    it('should work as expected', () => {
      const tests = [
        [12, 16, 4],
        [12, 18, 6],
        [15, 20, 5]
      ]
      for (const [a, b, res] of tests) {
        expect(greatestCommonDivisor(a, b)).to.eql(res)
      }
    })
    it('should throw an error if floats are passed in', () => {
      expect(() => greatestCommonDivisor(1.1, 2)).to.throw()
    })
  })
  describe('lowestCommonMultiple', () => {
    it('should work as expected', () => {
      const tests = [
        [6, 9, 18],
        [12, 8, 24],
        [13, 11, 143]
      ]
      for (const [a, b, res] of tests) {
        expect(lowestCommonMultiple(a, b)).to.eql(res)
      }
    })
    it('should throw an error if floats are passed in', () => {
      expect(() => lowestCommonMultiple(1.1, 2)).to.throw()
    })
    it('should return 0 if any of the numbers are zeros', () => {
      expect(lowestCommonMultiple(0, 1000)).to.eql(0)
    })
  })
  describe('clamp', () => {
    it('should return the same value if it does not exceed the bounds', () => {
      expect(clamp(10, 0, 11)).to.eql(10)
    })
    it(`should return the min value if it's less than the min`, () => {
      expect(clamp(-10, 1, 10)).to.eql(1)
    })
    it(`should return the max value if it's more than the max`, () => {
      expect(clamp(11, 0, 10)).to.eql(10)
    })
  })
  describe('wrap', () => {
    it(`should return the same value if it doesn't exceed the bounds`, () => {
      expect(wrap(10, 0, 100)).to.eql(10)
    })
    it(`should wrap around the min value`, () => {
      expect(wrap(-10, 0, 5)).to.eql(5)
      expect(wrap(2, 5, 10)).to.eql(7)
    })
    it(`should wrap around the max value`, () => {
      expect(wrap(10, 0, 5)).to.eql(0)
      expect(wrap(12, 5, 10)).to.eql(7)
    })
  })
})
