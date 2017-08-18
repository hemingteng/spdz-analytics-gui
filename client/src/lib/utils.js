/**
 * Check that a list of arrays are equal.
 * That is each array has same length and each element satisfies === operator.
 * Types are expected to be numbers or strings.
 * No items in arrays returns true.
 * @param {list of arrays} compareList [[a,b,c], [d,e,f], ....]
 * @return {boolean} true or false
 */
const listOfArraysEqual = compareList => {
  if (compareList.length === 0) {
    return true
  } else {
    return !!compareList.reduce((a, b) => {
      if (a === undefined || b === undefined) {
        return NaN
      }

      if (a.length === b.length) {
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            return NaN
          }
        }
      } else {
        return NaN
      }

      return a
    })
  }
}

const round = (number, precision) => {
  var factor = Math.pow(10, precision)
  var tempNumber = number * factor
  var roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

/**
 * Format unordered x,y pairs into ordered y values ready for plotting.
 * Also rounds and converts y to integer from fixed point.
 * 
 * @param {Array<Number>} xyData sparse array of [x0, y0, x1, y1 ....]  
 * @param {Array<Number>} resultArray array of y values ordered by x index.  
 */
const extractYValues = (xyData, resultArray) => {
  for (let i = 0; i < xyData.length / 2; i++) {
    if (xyData[i * 2] > resultArray.length - 1) {
      throw new Error(
        `Trying to map result value into array position ${xyData[
          i * 2
        ]} which is longer than result array length ${resultArray.length}.`
      )
    }
    resultArray[xyData[i * 2]] = round(xyData[i * 2 + 1] * 100, 1)
  }
  return resultArray
}

export { extractYValues, listOfArraysEqual }
