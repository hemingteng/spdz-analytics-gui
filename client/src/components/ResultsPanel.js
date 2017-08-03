import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DisplayPanel from './DisplayPanel'
import { DisplayBox } from './BaseStyles'
import colours from '../lib/colourScheme'

const DivDisplayStatus = DisplayBox.extend`
  flex-grow: 1;
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
  &:hover {background-color: #d5d5d5};
  box-shadow: 1px 1px ${colours.accentBackground};
  margin-top: 8px;
  &:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
`
const PDefaultLabel = styled.p`
    color: #888;    
  `

class ResultsPanel extends Component {
  render() {
    const submitButton = <form onSubmit={this.handleSubmit}>
      <SubmitButton type="submit" active>Run Query</SubmitButton>
    </form>

    const statusText = () => {
      return <PDefaultLabel>No status message to display...</PDefaultLabel>
    }

    const resultsText = () => {
      return <PDefaultLabel>No results to display...</PDefaultLabel>
    }

    return <DisplayPanel heading={submitButton}>
      <DivDisplayStatus>{statusText()}</DivDisplayStatus>
      <DivDisplayResults>{resultsText()}</DivDisplayResults>
    </DisplayPanel>
  }
}

ResultsPanel.propTypes = {
  selectedFunctionId: PropTypes.string,
  query1: PropTypes.string,
  query2: PropTypes.string
}

export default ResultsPanel