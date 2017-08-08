/**
 * Manage Websocket interations with analytics engines.
 */
import Io from 'socket.io-client'
import Bacon from 'baconjs'

/**
 * Connect to each analytics engine in preparation for runnning a query.
 * @param {Array<String>} urlList array of analytic engines
 * @param {Function} setEngineBusy call when analytic engine busy status changes (true, false)
 * @returns {Promise} resolves to array of analytic functions.
 */
const connectAnalyticEngines = (urlList, setEngineBusy) => {
  const connectOptions = {
    path: '/analytics/socket.io',
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    timeout: 5000,
    autoConnect: true
  }

  let statusStreamList = []

  for (const url of urlList) {
    const [
      statusStream
    ] = connectSetup(
      connectOptions,
      url + '/analytics'
    )
    statusStreamList.push(statusStream)
  }

  // Combine connection events so that:
  // 1. wait until all engines have replied with at least one event
  // 2. each time an engine sends a connect/disconnect get a combined event of all latest events.
  const combinedStatusStream = Bacon.combineAsArray(statusStreamList)

  // when an analytic engine status changes, work out combined status and make callback.
  combinedStatusStream.onValue(
    value => setEngineBusy(value.some(element => element))
  )
}

const connectSetup = (connectOptions, url) => {
  console.log(`Client connecting to ${url}.`)

  const socket = Io(url, connectOptions)

  //Wrap busy event into bacon stream
  const statusStream = Bacon.fromEvent(socket, 'busy')

  return [statusStream]
}


export { connectAnalyticEngines }