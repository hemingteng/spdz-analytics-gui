/**
 * Manage Websocket interations with analytics engines.
 * select sum(amount), count(amount) from v_cyberfraud
 * select sum(loss), count(loss) from v_cyberfraud
 */
import Io from 'socket.io-client'
import Bacon from 'baconjs'
import { listOfArraysEqual } from './utils'

let socketList = []

/**
 * Connect to each analytics engine in preparation for runnning a query.
 * @param {Array<String>} urlList array of analytic engines
 * @param {Function} setEngineBusy call when analytic engine busy status changes (true, false)
 * @param {Function} setProgressMsg call with {msg, status, serverName} to display progress to user
 * @param {Function} setResults call with [number] to display results to user
 * @returns {Promise} resolves to array of analytic functions.
 */
const connectAnalyticEngines = (
  urlList,
  setEngineBusy,
  setProgressMsg,
  setResults
) => {
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
  let goSpdzStreamList = []
  let resultStreamList = []
  let spdzErrorStreamList = []

  for (const url of urlList) {
    const [
      socket,
      statusStream,
      runQueryStream,
      goSpdzStream,
      resultStream,
      spdzErrorStream
    ] = connectSetup(connectOptions, url + '/analytics')
    socketList.push(socket)
    statusStreamList.push(statusStream)
    runQueryStreamList.push(runQueryStream)
    goSpdzStreamList.push(goSpdzStream)
    resultStreamList.push(resultStream)
    spdzErrorStreamList.push(spdzErrorStream)
  }

  // Combine status events so that:
  // 1. wait until all engines have replied with at least one event
  // 2. each time an engine sends a status event get a combined event of all latest events.
  const combinedStatusStream = Bacon.combineAsArray(statusStreamList)

  // When an analytic engine status changes, work out combined status and make callback.
  combinedStatusStream.onValue(value => {
    setEngineBusy(value.some(element => element.busy))
  })

  // Manage runQuery results
  manageQueryResults(runQueryStreamList, setProgressMsg)

  // Pass goSpdz progress messages on to caller.
  goSpdzStreamList.map(stream => stream.onValue(value => setProgressMsg(value)))

  // Check and forward analytic result
  manageAnalyticResults(resultStreamList, setProgressMsg, setResults)

  // Pass spdz error messages on to caller.
  spdzErrorStreamList.map(stream =>
    stream.onValue(value => setProgressMsg(value))
  )
}

const connectSetup = (connectOptions, url) => {
  console.log(`Client connecting to ${url}.`)

  const socket = Io(url, connectOptions)

  //Wrap events into bacon streams
  const statusStream = Bacon.fromEvent(socket, 'busy')
  const runQueryStream = Bacon.fromEvent(socket, 'runQueryResult')
  const goSpdzStream = Bacon.fromEvent(socket, 'goSpdzResult')
  const resultStream = Bacon.fromEvent(socket, 'analyticResult')
  const spdzErrorStream = Bacon.fromEvent(socket, 'spdzError')

  return [
    socket,
    statusStream,
    runQueryStream,
    goSpdzStream,
    resultStream,
    spdzErrorStream
  ]
}

const manageQueryResults = (runQueryStreamList, setProgressMsg) => {
  runQueryStreamList.map(stream =>
    stream.onValue(value => setProgressMsg(value))
  )

  // If all good send goSpdz otherwise runQueryReset on any that were good.
  const combinedQueryResultStream = Bacon.zipAsArray(runQueryStreamList)
  combinedQueryResultStream.onValue(results => {
    if (results.every(result => result.status <= 1)) {
      socketList.forEach(socket => {
        socket.emit('goSpdz')
      })
      setProgressMsg({
        msg: 'Requested analytic engines to start SPDZ calculation.',
        status: 1
      })
    } else {
      results.forEach((result, index) => {
        if (result.status <= 1) {
          socketList[index].emit('runQueryReset')
          setProgressMsg({
            msg: `Resetting analytic engine for ${result.serverName}.`,
            status: 2
          })
        }
      })
    }
  })
}

const manageAnalyticResults = (
  resultStreamList,
  setProgressMsg,
  setResults
) => {
  Bacon.zipAsArray(resultStreamList).onValue(results => {
    // Check status of each result is 0 and all results are equivalent.
    if (results.every(result => result.status === 0)) {
      const listOfResults = results.map(result => result.msg)
      if (!listOfArraysEqual(listOfResults)) {
        setProgressMsg({
          msg: `SPDZ engines returned conflicting results ${JSON.stringify(
            listOfResults
          )}.`,
          status: 3
        })
      } else {
        setResults(results[0].msg)
        setProgressMsg({
          msg: `SPDZ results returned ${JSON.stringify(results[0].msg)}.`,
          status: 0
        })
      }
    } else {
      // Send bad results back to user
      results
        .filter(result => result.status > 0)
        .forEach(result => setProgressMsg(result))
    }
  })
}

const sendDBQuery = (selectedFunctionId, ...sqlQueries) => {
  if (sqlQueries.length !== socketList.length) {
    throw new Error(
      `Unable to send ${sqlQueries.length} queries to ${socketList.length} sockets.`
    )
  }
  socketList.forEach((socket, index) => {
    socket.emit('runQuery', {
      query: sqlQueries[index],
      analyticFuncId: selectedFunctionId
    })
  })

  return `Sent ${sqlQueries.length} SQL queries to analytic engines.`
}

export { connectAnalyticEngines, sendDBQuery }
