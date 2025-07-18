import { add, Duration, format, formatISO, sub } from 'date-fns'

import { dateUtils } from '@utils'

const MOCKED_NOW_TIMESTAMP = 1752153010

function getRelativeDateDiff(diff: Duration, operation: 'sub' | 'add' = 'sub') {
  const time =
    operation === 'sub' ? sub(Date.now(), diff) : add(Date.now(), diff)
  const timeIso = formatISO(time)

  return dateUtils.formatRelative(timeIso)
}

describe('dateUtils', () => {
  describe('formatRelative', () => {
    beforeAll(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => MOCKED_NOW_TIMESTAMP)
    })

    afterAll(() => {
      jest.clearAllMocks()
    })

    it('should be displayed in seconds if less than 1 minute ago', () => {
      expect(getRelativeDateDiff({ seconds: 59 })).toBe('59 s')
    })

    it('should be displayed in minutes if less than 1 hour ago', () => {
      expect(getRelativeDateDiff({ minutes: 59 })).toBe('59 m')
    })

    it('should be displayed in hours if less than 1 day ago', () => {
      expect(getRelativeDateDiff({ hours: 23 })).toBe('23 h')
    })

    it('should be displayed in days if less than 1 week ago', () => {
      expect(getRelativeDateDiff({ days: 6 })).toBe('6 d')
    })

    it('should be displayed in weeks if less than 1 month ago', () => {
      expect(getRelativeDateDiff({ weeks: 3 })).toBe('3 sem')
    })

    it('should be displayed in months if more than 1 year ago', () => {
      expect(getRelativeDateDiff({ months: 11 })).toBe('11 mes')
    })

    it('should be displayed same date formatted(dd/MM/yyyy) if more than 1 year ago', () => {
      const time1YearAgo = sub(Date.now(), { years: 1 })
      const time1YearAgoFormatted = format(time1YearAgo, 'dd/MM/yyyy')
      expect(getRelativeDateDiff({ years: 1 })).toBe(time1YearAgoFormatted)
    })

    it('should be displayed same date formatted(dd/MM/yyyy) if future date', () => {
      const timeIn1Day = add(Date.now(), { days: 1 })
      const timeIn1DayFormatted = format(timeIn1Day, 'dd/MM/yyyy')
      expect(getRelativeDateDiff({ days: 1 }, 'add')).toBe(timeIn1DayFormatted)
    })
  })
})
