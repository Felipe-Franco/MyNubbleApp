import { stringUtils } from '@utils'

describe('stringUtils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of each word', () => {
      expect(stringUtils.capitalizeFirstLetter('Ana Maria')).toBe('Ana Maria')
      expect(stringUtils.capitalizeFirstLetter('ANA MARIA')).toBe('Ana Maria')
      expect(stringUtils.capitalizeFirstLetter('ana maria')).toBe('Ana Maria')

      expect(stringUtils.capitalizeFirstLetter('Maria')).toBe('Maria')
      expect(stringUtils.capitalizeFirstLetter('maria')).toBe('Maria')
      expect(stringUtils.capitalizeFirstLetter('MARIA')).toBe('Maria')
    })

    it('should remove leading/trailing spaces', () => {
      expect(stringUtils.capitalizeFirstLetter(' Ana    Maria ')).toBe(
        'Ana Maria',
      )
      expect(stringUtils.capitalizeFirstLetter('    Maria  ')).toBe('Maria')
    })
  })
})
