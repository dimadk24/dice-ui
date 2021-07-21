import { Utils } from './Utils'

describe('Utils', () => {
  const createEmptyArray = (size = 100): Array<null> => {
    return new Array(size).fill(null)
  }

  const expectToContainNegative = (array: Array<number>) =>
    expect(array.some((number) => number < 0)).toBe(true)

  const expectToContainPositive = (array: Array<number>) =>
    expect(array.some((number) => number > 0)).toBe(true)

  describe('generateRandom', () => {
    it('returns positive number', () => {
      const numbers = createEmptyArray().map(() => Utils.generateRandom(0, 100))
      expect(numbers).toHaveLength(100)
      numbers.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(0)
        expect(number).toBeLessThanOrEqual(100)
      })
    })

    it('returns negative number', () => {
      const numbers = createEmptyArray().map(() =>
        Utils.generateRandom(-100, 0)
      )
      expect(numbers).toHaveLength(100)
      numbers.forEach((number) => {
        expect(number).toBeLessThanOrEqual(0)
        expect(number).toBeGreaterThanOrEqual(-100)
      })
    })

    it('returns both negative and positive numbers', () => {
      const numbers = createEmptyArray().map(() =>
        Utils.generateRandom(-50, 50)
      )
      expect(numbers).toHaveLength(100)
      numbers.forEach((number) => {
        expect(number).toBeLessThanOrEqual(50)
        expect(number).toBeGreaterThanOrEqual(-50)
      })
      expectToContainNegative(numbers)
      expectToContainPositive(numbers)
    })
  })

  describe('changeSignRandomly', () => {
    it('changes sign', () => {
      const numbers = createEmptyArray()
        .map(() => Utils.generateRandom(1, 100))
        .map((number) => Utils.changeSignRandomly(number))
      expect(numbers).toHaveLength(100)
      expectToContainNegative(numbers)
      expectToContainPositive(numbers)
    })
  })

  describe('generateRandomWithRandomSign', () => {
    it('returns only numbers between passed with any sign', () => {
      const numbers = createEmptyArray().map(() =>
        Utils.generateRandomWithRandomSign(5, 10)
      )
      expect(numbers).toHaveLength(100)
      numbers.forEach((number) => {
        expect(number).toBeLessThanOrEqual(10)
        expect(number).toBeGreaterThanOrEqual(-10)
        expect(number < 5 && number > -5).toBe(false)
      })
      expectToContainNegative(numbers)
      expectToContainPositive(numbers)
    })
  })
})
