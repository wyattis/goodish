import { expect } from 'chai'
import 'mocha'
import {
  combinationsOf,
  count,
  permutationsOf,
  randomFrom,
  range,
  rangeArr,
  shuffle,
  swap,
  transpose,
  randomNFrom
} from '../src'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

describe('Iterator helpers', () => {
  describe('Permutations', () => {
    it('should generate the correct number of permutations from any array', () => {
      const tests: [number, number][] = [
        [1, 1],
        [2, 2],
        [3, 6],
        [4, 24],
        [5, 24 * 5],
        [6, 24 * 5 * 6]
      ]
      for (const [size, n] of tests) {
        expect(count(permutationsOf(rangeArr(0, size)))).to.eql(n, `There should be ${n} permutations`)
      }
    })
    it('should have unique permutations', () => {
      const vals = [0, 1, 2, 3]
      const perms = Array.from(permutationsOf(vals))
      const permSet = new Set(perms.map(p => p.join('')))
      expect(permSet.size).to.eql(perms.length, 'All permutations should be unique')
    })
    it('should have the expected result', () => {
      const perms = Array.from(permutationsOf([0, 1, 2]))
      expect(perms).to.deep.include.members([[0, 1, 2], [1, 0, 2], [2, 0, 1], [0, 2, 1], [1, 2, 0], [2, 1, 0]])
    })
  })
  describe('Combinations', () => {
    it('should generate combinations of N from an array', () => {
      const tests: [number, number, number][] = [
        [1, 1, 1],
        [2, 1, 2],
        [2, 2, 1],
        [3, 1, 3],
        [3, 2, 3],
        [3, 3, 1],
        [4, 1, 4],
        [4, 2, 6],
        [4, 3, 4],
        [4, 4, 1]
      ]
      for (const [size, n, expected] of tests) {
        expect(count(combinationsOf(rangeArr(0, size), n))).to.eql(expected, `There should be ${expected} combinations`)
      }
    })
  })
  describe('Swap', () => {
    it('should swap two values of an array in place', () => {
      const arr = [0, 1, 2]
      swap(arr, 1, 2)
      expect(arr).to.deep.equal([0, 2, 1], 'The array did not swap correctly')
    })
  })
  describe('Transpose', () => {
    it('should transpose NxN arrays', () => {
      const tests: [number[][], number[][]][] = [
        [[[0]], [[0]]],
        [[[0, 1], [0, 1]], [[0, 0], [1, 1]]],
        [[[0, 1, 2], [0, 1, 2], [0, 1, 2]], [[0, 0, 0], [1, 1, 1], [2, 2, 2]]]
      ]
      for (const [arr, expected] of tests) {
        expect(transpose(arr)).to.deep.equal(expected)
      }
    })
    it('should transpose NxM arrays', () => {
      const tests: [number[][], number[][]][] = [
        [[[0, 1]], [[0], [1]]],
        [[[0, 1, 2], [0, 1, 2]], [[0, 0], [1, 1], [2, 2]]]
      ]
      for (const [arr, expected] of tests) {
        expect(transpose(arr)).to.deep.equal(expected)
      }
    })
  })
  describe('Shuffle', () => {
    it('should keep all of the elements of the array', () => {
      const tests: number[] = rangeArr(1, 20)
      for (const n of tests) {
        const arr = rangeArr(0, n)
        expect(shuffle(arr.slice())).to.include.members(arr)
      }
    })
    it('should change the order of the array', () => {
      const tests: number[] = rangeArr(10, 30)
      for (const n of tests) {
        const arr = rangeArr(0, n)
        expect(shuffle(arr.slice())).to.not.deep.equal(arr)
      }
    })
  })
  describe('Range', () => {
    it('should generate a range of integers by default', () => {
      expect(Array.from(range(0, 5))).to.deep.equal([0, 1, 2, 3, 4])
    })
    it('should obey the step parameter', () => {
      expect(Array.from(range(0, 2, .5))).to.deep.equal([0, .5, 1, 1.5])
    })
  })
  describe('Range array', () => {
    it('should generate a range of integers by default', () => {
      expect(Array.from(rangeArr(0, 5))).to.deep.equal([0, 1, 2, 3, 4])
    })
    it('should obey the step parameter', () => {
      expect(Array.from(rangeArr(0, 2, .5))).to.deep.equal([0, .5, 1, 1.5])
    })
  })
  describe('Count', () => {
    it('should work on arrays', () => {
      expect(count([0, 1, 2, 3])).to.eql(4)
    })
    it('should work on generators', () => {
      expect(count(range(0, 100))).to.eql(100)
    })
  })
  describe('Random from', () => {
    it('should return null for an empty array', () => {
      expect(randomFrom([])).to.be.null
    })
    it('should randomly select a value from an array', () => {
      const [r, _] = randomFrom(Array.from(range(0, 5)))
      expect(r).to.be.an('number')
    })
  })
  describe('Random N from', () => {
    it('should return an empty array if an empty array is passed in', () => {
      expect(randomNFrom([], 100)).to.deep.equal([])
    })
    it('should return a random array matching length', () => {
      const r = randomNFrom(alphabet.split(''), 20)
      console.log(r)
      expect(r).to.have.lengthOf(20)
    })
  })
})
