/**
 * Manage REST calls to GUI server.
 */
import { parseIfJson } from './restUtils'

/**
 * Get the list of analytic engine servers from the GUI Rest endpoint.
 * @returns {Promise} resolve to json from server or reject with Error.
 */
const getAnalyticConfig = url => {
  return fetch(url,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      mode: 'same-origin'
    })
    .then(parseIfJson)
    .then((result) => {
      if (result.response.ok) {
        return Promise.resolve(result.jsonData)
      } else {
        let error = new Error(`Unable to read analytics GUI config. Status: ${result.response.status}.`)
        error.reason = result.jsonData
        return Promise.reject(error)
      }
    })
}

export { getAnalyticConfig }