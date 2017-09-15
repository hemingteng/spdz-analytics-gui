import {
  extractYValues,
  listOfArraysEqual,
  removeZeroIndexes,
  splitXYList
} from './utils'

describe('Util to manage list of arrays comparision works as expected', () => {
  it('Compares numberic lists as equal', () => {
    expect(listOfArraysEqual([[1], [1]])).toBeTruthy()
    expect(listOfArraysEqual([[1, 2, 3], [1, 2, 3]])).toBeTruthy()
    expect(
      listOfArraysEqual([[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]])
    ).toBeTruthy()
  })

  it('Compares string lists as equal', () => {
    const testData = [
      ['http://localhost:3020', 'http://localhost:3021'],
      ['http://localhost:3020', 'http://localhost:3021']
    ]
    expect(listOfArraysEqual(testData)).toBeTruthy()
  })

  it('Compares numberic lists with diff lengths as not equal', () => {
    expect(
      listOfArraysEqual([[1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4]])
    ).toBeFalsy()
  })

  it('Compares lists with diff elements as not equal', () => {
    expect(listOfArraysEqual([[1, 2, 3], [1, 2, 3], [1, 2, 9]])).toBeFalsy()
    expect(
      listOfArraysEqual([[1, 2, 3], [1, 'help', 3], [1, 2, 3]])
    ).toBeFalsy()
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

describe('Util to extract y values from array of xy values, run some processing', () => {
  it('Successfully extracts 2 values and pads into array of 3', () => {
    const result = new Array(3)
    result.fill(0)
    const input = [0, 0, 2, 0.22, 1, 0.11]
    expect(extractYValues(input, result)).toEqual([0, 11, 22])
  })

  it('Successfully extracts 3 values and pads into array of 24', () => {
    const result = new Array(24)
    result.fill(0)
    const input = [21, 0.125, 16, 0.1240234375, 23, 0.375, 20, 0.125, 15, 0.25]
    // prettier-ignore
    expect(extractYValues(input, result)).toEqual([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 12.4, 0, 0, 0, 12.5, 12.5, 0, 37.5
    ])
  })

  it('Throws an error if index out of range', () => {
    const result = new Array(5)
    result.fill(0)
    const input = [2, 22, 6, 66]

    const testThrows = () => extractYValues(input, result)

    expect(testThrows).toThrow(
      'Trying to map result value into array position 6 which is longer than result array length 5.'
    )
  })
})

describe('Util to remove an xy pair from an array if x is xero', () => {
  it('Successfully removes zero values', () => {
    const result = removeZeroIndexes([1, 100, 2, 200, 0, 0, 0, 0])
    expect(result).toEqual([1, 100, 2, 200])
  })

  it('Successfully removes zero values again', () => {
    const result = removeZeroIndexes([0, 0, 1, 100, 2, 200, 0, 0, 0, 0, -1, 99])
    expect(result).toEqual([1, 100, 2, 200, -1, 99])
  })

  it('Handles an empty result set', () => {
    const result = removeZeroIndexes([])
    expect(result).toEqual([])
  })

  it('Throws an error if the input array does not contain multiple of 2 elements', () => {
    const testThrows = () => removeZeroIndexes([1, 100, 2, 200, 5])

    expect(testThrows).toThrow(
      'Expecting a results array with an even number of elements.'
    )
  })
})

describe('Util to split list of x,y values into list of x and list of processed y', () => {
  it('Successfully splits a result set', () => {
    const [xlist, ylist] = splitXYList([1, 0.1, 2, 0.225, 3, 0])
    expect(xlist).toEqual([1, 2, 3])
    expect(ylist).toEqual([10, 22.5, 0])
  })

  it('Successfully splits an empty result set', () => {
    const [xlist, ylist] = splitXYList([])
    expect(xlist).toEqual([])
    expect(ylist).toEqual([])
  })
})
