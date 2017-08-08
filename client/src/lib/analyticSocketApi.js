/**
 * Manage Websocket interations with analytics engines.
 */
import Io from 'socket.io-client'
import Bacon from 'baconjs'

let socketList = []

/**
 * Connect to each analytics engine in preparation for runnning a query.
 * @param {Array<String>} urlList array of analytic engines
 * @param {Function} setEngineBusy call when analytic engine busy status changes (true, false)
 * @param {Function} setProgressMsg call with {msg, status, serverName} to display progress to user
 * @returns {Promise} resolves to array of analytic functions.
 */
const connectAnalyticEngines = (urlList, setEngineBusy, setProgressMsg) => {
  const connectOptions = {
    path: '/analytics/socket.io',
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
    timeout: 5000,
    autoConnect: true
  }

  socketList = []
  let statusStreamList = []
  let runQueryStreamList = []

  for (const url of urlList) {
    const [
      socket,
      statusStream,
      runQueryStream
    ] = connectSetup(
      connectOptions,
      url + '/analytics'
    )
    socketList.push(socket)
    statusStreamList.push(statusStream)
    runQueryStreamList.push(runQueryStream)
  }

  // Combine status events so that:
  // 1. wait until all engines have replied with at least one event
  // 2. each time an engine sends a status event get a combined event of all latest events.
  const combinedStatusStream = Bacon.combineAsArray(statusStreamList)

  // When an analytic engine status changes, work out combined status and make callback.
  combinedStatusStream.onValue(
    value => {
      setEngineBusy(value.some(element => element.busy))
    }
  )

  // Manage runQuery results
  runQueryStreamList.map(stream =>
    stream.onValue(value => setProgressMsg(value))
  )

  //TODO if all good send goSpdz otherwise runQueryReset any good.
  const combinedQueryResultStream = Bacon.zipAsArray(runQueryStreamList)
  combinedQueryResultStream.onValue(value => console.log(`Query results combined ${JSON.stringify(value)}.`))
}

const connectSetup = (connectOptions, url) => {
  console.log(`Client connecting to ${url}.`)

  const socket = Io(url, connectOptions)

  //Wrap events into bacon streams
  const statusStream = Bacon.fromEvent(socket, 'busy')
  const runQueryStream = Bacon.fromEvent(socket, 'runQueryResult')

  return [socket, statusStream, runQueryStream]
}

const sendDBQuery = (selectedFunctionId, ...sqlQueries) => {
  if (sqlQueries.length !== socketList.length) {
    throw new Error(`Unable to send ${sqlQueries.length} queries to ${socketList.length} sockets.`)
  }
  socketList.forEach((socket, index) => {
    socket.emit('runQuery', { query: sqlQueries[index], analyticFuncId: selectedFunctionId })
  })

  return `Sent ${sqlQueries.length} SQL queries to analytic engines.`
}

export { connectAnalyticEngines, sendDBQuery }