import { listOfArraysEqual } from './utils'

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
