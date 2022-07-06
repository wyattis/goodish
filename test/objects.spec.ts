import 'mocha'
import { expect } from 'chai'
import { copyProps } from '../dist/Objects'

describe('Objects', () => {
  describe('copyProps', () => {
    it('should create an identical copy of objects when no options are provided', () => {
      expect(copyProps({ one: 1, two: 2 })).to.deep.equal({ one: 1, two: 2 })
    })
    it('should keep properties in the allowed list', () => {
      expect(copyProps({ one: 1, two: 2, three: 3 }, { allowed: ['two'] })).to.deep.equal({ two: 2 })
    })
    it('should remove properties in the blocked list', () => {
      expect(copyProps({ one: 1, two: 2, three: 3 }, { blocked: ['two'] })).to.deep.equal({ one: 1, three: 3 })
    })
    it('should throw an error if allowed and blocked opts are provided', () => {
      expect(() => copyProps({}, { blocked: [], allowed: [] })).to.throw()
    })
  })
})