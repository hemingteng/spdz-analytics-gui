import { extractYValues, listOfArraysEqual } from './utils'

describe('Util to manage list of arrays comparision works as expected', () => {
  it('Compares numberic lists as equal', () => {
    expect(listOfArraysEqual([[1], [1]])).toBeTruthy()
    expect(listOfArraysEqual([[1, 2, 3], [1, 2, 3]])).toBeTruthy()
    expect(listOfArraysEqual([[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]])).toBeTruthy()
  })

  it('Compares string lists as equal', () => {
    const testData = [['http://localhost:3020', 'http://localhost:3021'], ['http://localhost:3020', 'http://localhost:3021']]
    expect(listOfArraysEqual(testData)).toBeTruthy()
  })

  it('Compares numberic lists with diff lengths as not equal', () => {
    expect(listOfArraysEqual([[1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4]])).toBeFalsy()
  })

  it('Compares lists with diff elements as not equal', () => {
    expect(listOfArraysEqual([[1, 2, 3], [1, 2, 3], [1, 2, 9]])).toBeFalsy()
    expect(listOfArraysEqual([[1, 2, 3], [1, 'help', 3], [1, 2, 3]])).toBeFalsy()
  })

  it('Compares lists with an undefined element as not equal', () => {
    expect(listOfArraysEqual([undefined, undefined])).toBeFalsy()
    expect(listOfArraysEqual([[1, 2], undefined])).toBeFalsy()
  })

  it('Compares empty lists as equal', () => {
    expect(listOfArraysEqual([])).toBeTruthy()
    expect(listOfArraysEqual([[], [], []])).toBeTruthy()
  })
})

describe('Util to manage extracting y values from array of xy values', () => {
  it('Successfully extracts 2 values out of 3', () => {
    const result = new Array(3)
    result.fill(0)
    const input = [0, 0, 2, 22, 1, 11]
    expect(extractYValues(input, result)).toEqual([0, 11, 22])
  })

  it('Successfully extracts 5 values out of 24', () => {
    const result = new Array(24)
    result.fill(0)
    const input = [21, 0.125, 16, 0.1240234375, 23, 0.375, 20, 0.125, 15, 0.25]
    expect(extractYValues(input, result)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.25, 0.124, 0, 0, 0, 0.125, 0.125, 0, 0.375])
  })

  it('Throws an error if index out of range', () => {
    const result = new Array(5)
    result.fill(0)
    const input = [2, 22, 6, 66]

    const testThrows = () => extractYValues(input, result)

    expect(testThrows).toThrow('Trying to map result value into array position 6 which is longer than result array length 5.')
  })

})

