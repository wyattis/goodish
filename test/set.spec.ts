import { expect } from 'chai'
import 'mocha'
import {
  union, intersection, difference, exclusiveOr, rightDifference
} from '../dist/Set'

const sets = {
  '1-5': [1, 2, 3, 4, 5],
  '6-10': [6, 7, 8, 9, 10],
  '1-3': [1, 2, 3],
  '4-6': [4, 5, 6],
  '7-9': [7, 8, 9],
  odd: [1, 3, 5, 7, 9],
  even: [2, 4, 6, 8, 10],
  '1-10': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

describe('Sets', () => {
  describe('union', () => {
    it('should return 1-10 for the union between 1-5 and 6-10', () => {
      expect(union(sets['1-5'], sets['6-10'])).to.have.members(sets['1-10'])
    })
    it('should equal the first set if the second is empty', () => {
      expect(union(sets['1-3'], [])).to.have.members(sets['1-3'])
    })
    it('should equal the second set if the first is empty', () => {
      expect(union([], sets['4-6'])).to.have.members(sets['4-6'])
    })
  })
  describe('intersection', () => {
    it('should return [4,5] for 1-5 and 4-6', () => {
      expect(intersection(sets['1-5'], sets['4-6'])).to.have.members([4, 5], 'should work forward')
      expect(intersection(sets['4-6'], sets['1-5'])).to.have.members([4, 5], 'should work backward')
    })
    it('should return 1-5 for 1-10 and 1-5', () => {
      expect(intersection(sets['1-5'], sets['1-10'])).to.have.members(sets['1-5'])
    })
  })
  describe('difference', () => {
    it('should return the left set if there is no overlap', () => {
      expect(difference(sets.even, sets.odd)).to.have.members(sets.even)
      expect(rightDifference(sets.odd, sets.even)).to.have.members(sets.even)
    })
    it('should return 6,10 for 6-10 and 7-9', () => {
      expect(difference(sets['6-10'], sets['7-9'])).to.have.members([6, 10])
      expect(rightDifference(sets['7-9'], sets['6-10'])).to.have.members([6, 10])
    })
  })
  describe('exclusiveOr', () => {
    it('should return the union if neither set overlaps', () => {
      expect(exclusiveOr(sets.even, sets.odd)).to.have.members(union(sets.even, sets.odd))
    })
    it('should return 4,5 for 1-3 and 1-5', () => {
      expect(exclusiveOr(sets['1-3'], sets['1-5'])).to.have.members([4, 5])
      expect(exclusiveOr(sets['1-5'], sets['1-3'])).to.have.members([4, 5])
    })
  })
  describe('combinations', () => {
    it('leftDiff + intersection + rightDiff = union', () => {
      // expect(difference())
    })
  })
})