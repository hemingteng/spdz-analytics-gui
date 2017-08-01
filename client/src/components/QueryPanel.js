/**
 * Given an analytic engine URL, query for schema, allow user to enter query.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DisplayPanel from './DisplayPanel'
import { getEngineSchema } from '../lib/analyticApi'

class QueryPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schema: {}
    }
    this.readSchema = this.readSchema.bind(this)
  }

  /**
   * At startup try to get schema from analytic engine.
   */
  componentDidMount() {
    this.readSchema()
  }

  readSchema() {
    if (this.props.engineURL !== undefined && this.props.engineAPI !== undefined) {
      getEngineSchema(this.props.engineURL, this.props.engineAPI)
        .then((json) => {
          this.setState({ schema: json })
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }

  render() {
    const PreSchema = styled.pre`
      white-space: pre-wrap;
    `

    // influenced by from react bootstrap styling
    const TextAreaSchema = styled.textarea`
      height: 6em;
      padding: 6px 12px;
      color: #555;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 4px;
      &:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
                box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
      };
    `

    const analyticEngineName = (url) =>
      url !== undefined ?
        `Query for ${url.replace(/^https?:\/\//i, '')}` :
        'Awaiting connection details...'

    return <DisplayPanel heading={analyticEngineName(this.props.engineURL)}>
      <PreSchema>{JSON.stringify(this.state.schema)}</PreSchema>
      <TextAreaSchema placeholder="Enter SQL query ..." />
    </DisplayPanel>
  }
}

QueryPanel.propTypes = {
  engineURL: PropTypes.string,
  engineAPI: PropTypes.string
}

export default QueryPanel