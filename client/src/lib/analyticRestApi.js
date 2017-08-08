/**
 * Manage REST calls to analytics engines.
 */
import { parseIfJson } from './restUtils'

/**
 * Get the list of analytic functions.
 * Retrives from first engine only.
 * TODO retrieve from all and compare.
 * @param {Array<String>} urlList array of analytic engines
 * @param {String} api endpoint
 * @returns {Promise} resolves to array of analytic functions.
 */
const getAnalyticFunctions = (urlList, api) => {
  if (urlList.length === 0) {
    return Promise.reject('No analytic engine URLs supplied, unable to read for analytic functions.')
  } else {
    return fetch(urlList[0] + api + '/functions',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        mode: 'cors'
      })
      .then(parseIfJson)
      .then((result) => {
        if (result.response.ok) {
          return Promise.resolve(result.jsonData)
        } else {
          let error = new Error(`Unable to read analytics functions list. Status: ${result.response.status}.`)
          error.reason = result.jsonData
          return Promise.reject(error)
        }
      })
  }
}

const getEngineSchema = (url, api) => {
  return fetch(url + api + '/schema',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors'
    })
    .then(parseIfJson)
    .then((result) => {
      if (result.response.ok) {
        return Promise.resolve(result.jsonData)
      } else {
        let error = new Error(`Unable to read schema. Status: ${result.response.status}.`)
        error.reason = result.jsonData
        return Promise.reject(error)
      }
    })
}

export { getAnalyticFunctions, getEngineSchema }