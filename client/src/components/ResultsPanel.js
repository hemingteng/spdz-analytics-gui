import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DisplayPanel from './DisplayPanel'
import { DisplayBox } from './BaseStyles'
import colours from '../lib/colourScheme'
import { connectAnalyticEngines } from '../lib/analyticSocketApi'
import { arraysEqual } from '../lib/utils'


const DivHeading = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const PStatusMsg = styled.p`
  margin: 2px;
  color: #888;    
`
const PSuccess = PStatusMsg.extend`
  color: #3c763d;
`
const PInfo = PStatusMsg.extend`
  color: #31708f;
`
const PWarn = PStatusMsg.extend` 
   color: #8a6d3b;
`
const PDanger = PStatusMsg.extend` 
   color: #a94442;
`

const DivQueryStatus = DisplayBox.extend`
  padding: 6px;
  margin-bottom: 8px;
  background-color: white;
`
const DivDisplayResults = DisplayBox.extend`
  padding: 6px;
  background-color: white;
  height: 10em;
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
const DivPadding = styled.div`
  padding: 10px 8px 0px 10px;
`

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
  }

  componentDidMount() {
    this.connectWebSocket(this.props.engineURLs)
  }

  componentWillReceiveProps(nextProps) {
    if (!arraysEqual(this.props.engineURLs, nextProps.engineURLs)) {
      this.connectWebSocket(nextProps.engineURLs)
    }
  }

  connectWebSocket(engineURLs) {
    if (engineURLs.length > 0) {
      connectAnalyticEngines(engineURLs,
        (engineStatus) => this.setState({ enginesBusy: engineStatus }))
    }
  }

  handleSubmit(event) {
    console.log('TODO submit query')
    event.preventDefault()
  }

  render() {
    const connectionStatusMsg = () => {
      if (this.state.enginesBusy === undefined) {
        return <PWarn>Not connected to analytic engines.</PWarn>
      }

      if (this.state.enginesBusy) {
        return <PInfo>'Analytic engines are busy.'</PInfo>
      }

      let status = 'Analytic engines are ready to run a query.'

      if (this.props.selectedFunctionId === undefined
        || this.props.query1 === undefined
        || this.props.query1.length === 0
        || this.props.query2 === undefined
        || this.props.query2.length === 0) {
        status += ' Choose the analytic function and enter the queries to run.'
      }
      return <PInfo>{status}</PInfo>
    }

    const runQueryStatus = () => {
      if (this.props.selectedFunctionId !== undefined
        && this.props.query1 !== undefined
        && this.props.query1.length > 0
        && this.props.query2 !== undefined
        && this.props.query1.length > 0
        && this.state.enginesBusy !== undefined
        && !this.state.enginesBusy) {
        return ''
      }
      else {
        return 'disabled'
      }
    }

    const headingComponent =
      <DivHeading>
        <form onSubmit={this.handleSubmit}>
          <SubmitButton type="submit" disabled={runQueryStatus()}>Run Query</SubmitButton>
        </form>
        <DivPadding>
          {connectionStatusMsg()}
        </DivPadding>
      </DivHeading>

    const formatProgressMessages = (msgs) => {
      if (msgs.length === 0) {
        return <PStatusMsg>No query has been submitted...</PStatusMsg>
      } else {
        return <div>
          <PInfo>Info type message</PInfo>
          <PWarn>Warn type message</PWarn>
          <PDanger>Danger type message</PDanger>
          <PSuccess>Success type message</PSuccess>
        </div>
      }
    }

    const formatResults = (results) => {
      if (results.length === 0) {
        return <PStatusMsg>No results to display...</PStatusMsg>
      } else {
        // components to format different function results ?         
      }
    }

    return <DisplayPanel heading={headingComponent}>
      <DivQueryStatus>{formatProgressMessages(this.state.progressMessages)}</DivQueryStatus>
      <DivDisplayResults>{formatResults(this.state.results)}</DivDisplayResults>
    </DisplayPanel>
  }
}

ResultsPanel.propTypes = {
  engineURLs: PropTypes.arrayOf(PropTypes.string),
  selectedFunctionId: PropTypes.string,
  query1: PropTypes.string,
  query2: PropTypes.string
}

export default ResultsPanel