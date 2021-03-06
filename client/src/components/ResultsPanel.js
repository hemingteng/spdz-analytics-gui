import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DisplayPanel from './DisplayPanel'
import { DisplayBox } from './BaseStyles'
import colours from '../lib/colourScheme'
import { connectAnalyticEngines, sendDBQuery } from '../lib/analyticSocketApi'
import {
  extractYValues,
  listOfArraysEqual,
  removeZeroIndexes,
  splitXYList
} from '../lib/utils'
import PercentHistogram from './PercentHistogram'
import SumLookup from './SumLookup'
import { PanelHeaderText } from './BaseStyles'

const DivHeading = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const PStatusMsg = styled.p`
  margin: 2px;
  color: #888;
`
const PSuccess = PStatusMsg.extend`color: #3c763d;`
const PInfo = PStatusMsg.extend`color: #31708f;`
const PWarn = PStatusMsg.extend`color: #8a6d3b;`
const PDanger = PStatusMsg.extend`color: #a94442;`

const DivQueryStatus = DisplayBox.extend`
  padding: 6px;
  margin-bottom: 8px;
  background-color: white;
`
const DivDisplayResults = DisplayBox.extend`
  padding: 6px;
  background-color: white;
  min-height: 10em;
`
// influenced by react bootstrap styling
const SubmitButton = styled.button`
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #ccc;
  color: ${colours.darkPrimaryBackground};
  background-color: #f5f5f5;
  &:hover:enabled {background-color: #d5d5d5};
  box-shadow: 1px 1px ${colours.accentBackground};
  margin-top: 8px;
  margin-bottom: 2px;
  &:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
`
const DivPadding = styled.div`padding: 10px 8px 0px 10px;`

const STATUS = {
  GOOD: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
}

class ResultsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enginesBusy: undefined,
      progressMessages: [],
      results: []
    }
    this.connectWebSocket = this.connectWebSocket.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addStatusMessage = this.addStatusMessage.bind(this)
    this.formatAndStoreResults = this.formatAndStoreResults.bind(this)
  }

  componentDidMount() {
    this.connectWebSocket(this.props.engineURLs)
  }

  componentWillReceiveProps(nextProps) {
    if (!listOfArraysEqual([this.props.engineURLs, nextProps.engineURLs])) {
      this.connectWebSocket(nextProps.engineURLs)
    }
    if (this.props.selectedFunctionId !== nextProps.selectedFunctionId) {
      this.setState({ progressMessages: [], results: [] })
    }
  }

  connectWebSocket(engineURLs) {
    if (engineURLs.length > 0) {
      connectAnalyticEngines(
        engineURLs,
        engineStatus => {
          this.setState({ enginesBusy: engineStatus })
        },
        statusMsg => {
          this.addStatusMessage(
            statusMsg.msg,
            statusMsg.status,
            statusMsg.serverName
          )
        },
        results => {
          this.formatAndStoreResults(results)
        }
      )
    }
  }

  handleSubmit(event) {
    this.setState({ progressMessages: [], results: [] })

    try {
      const msg = sendDBQuery(
        this.props.selectedFunctionId,
        this.props.query1,
        this.props.query2
      )
      this.addStatusMessage(msg, STATUS.INFO)
    } catch (err) {
      this.addStatusMessage(err.message, STATUS.ERROR)
    }
    event.preventDefault()
  }

  addStatusMessage(msg, status, serverName = undefined) {
    this.setState((prevState, props) => {
      return {
        progressMessages: prevState.progressMessages.concat([
          { msg: msg, status: status, serverName: serverName }
        ])
      }
    })
  }

  formatAndStoreResults(results) {
    if (this.props.selectedFunctionId === 'percentHour') {
      const emptyArray = new Array(24)
      emptyArray.fill(0)
      const extractedResults = extractYValues(results, emptyArray)
      this.setState({ results: extractedResults })
    } else if (this.props.selectedFunctionId === 'sumlookup') {
      const extractedResults = splitXYList(removeZeroIndexes(results))
      this.setState({ results: extractedResults })
    } else {
      this.setState({ results: results })
    }
  }

  render() {
    const connectionStatusMsg = () => {
      if (this.state.enginesBusy === undefined) {
        return <PWarn>Not connected to analytic engines.</PWarn>
      }

      if (this.state.enginesBusy) {
        return <PInfo>Analytic engines are busy.</PInfo>
      }

      let status = 'Analytic engines are ready to run a query.'

      if (
        this.props.selectedFunctionId === undefined ||
        this.props.query1 === undefined ||
        this.props.query1.length === 0 ||
        this.props.query2 === undefined ||
        this.props.query2.length === 0
      ) {
        status += ' Choose the analytic function and enter the queries to run.'
      }
      return (
        <PInfo>
          {status}
        </PInfo>
      )
    }

    const runQueryStatus = () => {
      if (
        this.props.selectedFunctionId !== undefined &&
        this.props.query1 !== undefined &&
        this.props.query1.length > 0 &&
        this.props.query2 !== undefined &&
        this.props.query1.length > 0 &&
        this.state.enginesBusy !== undefined &&
        !this.state.enginesBusy
      ) {
        return ''
      } else {
        return 'disabled'
      }
    }

    const headingComponent = (
      <DivHeading>
        <form onSubmit={this.handleSubmit}>
          <SubmitButton type="submit" disabled={runQueryStatus()}>
            Run Query
          </SubmitButton>
        </form>
        <DivPadding>
          {connectionStatusMsg()}
        </DivPadding>
      </DivHeading>
    )

    const displayProgress = (log, index) => {
      const msg =
        log.msg +
        (log.serverName !== undefined ? ` Sent by ${log.serverName}.` : '')
      if (log.status === 1) {
        return (
          <PInfo key={index}>
            {msg}
          </PInfo>
        )
      } else if (log.status === 2) {
        return (
          <PWarn key={index}>
            {msg}
          </PWarn>
        )
      } else if (log.status === 3) {
        return (
          <PDanger key={index}>
            {msg}
          </PDanger>
        )
      } else if (log.status === 0) {
        return (
          <PSuccess key={index}>
            {msg}
          </PSuccess>
        )
      } else {
        return (
          <PStatusMsg key={index}>
            {msg}
          </PStatusMsg>
        )
      }
    }

    const formatProgressMessages = msgs => {
      if (msgs.length === 0) {
        return <PStatusMsg>No query has been submitted...</PStatusMsg>
      } else {
        return (
          <div>
            {msgs.map((msg, index) => displayProgress(msg, index))}
          </div>
        )
      }
    }

    const resultComponent = results => {
      if (this.props.selectedFunctionId === 'percentHour') {
        const heading = (
          <PanelHeaderText>
            Distribution of cyber incidents by hour
          </PanelHeaderText>
        )
        return <PercentHistogram heading={heading} data={results} />
      } else if (this.props.selectedFunctionId === 'sumlookup') {
        const heading = (
          <PanelHeaderText>
            Distribution of cyber loss by attribution group
          </PanelHeaderText>
        )
        return <SumLookup heading={heading} data={results} />
      } else if (this.props.selectedFunctionId === 'avg') {
        if (results.length === 0) {
          return <PStatusMsg>No results to display...</PStatusMsg>
        } else {
          return (
            <div>
              {results}
            </div>
          )
        }
      } else {
        return <PStatusMsg>No results to display...</PStatusMsg>
      }
    }

    return (
      <DisplayPanel heading={headingComponent}>
        <DivQueryStatus>
          {formatProgressMessages(this.state.progressMessages)}
        </DivQueryStatus>
        <DivDisplayResults>
          {resultComponent(this.state.results)}
        </DivDisplayResults>
      </DisplayPanel>
    )
  }
}

ResultsPanel.propTypes = {
  engineURLs: PropTypes.arrayOf(PropTypes.string),
  selectedFunctionId: PropTypes.string,
  query1: PropTypes.string,
  query2: PropTypes.string
}

export default ResultsPanel
