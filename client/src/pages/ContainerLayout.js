/**
 * Manage startup config, coordinate state between components.
 */
import React, { Component } from 'react'
import Layout from './Layout'
import AnalyticFunctionPanel from '../components/AnalyticFunctionPanel'
import QueryPanel from '../components/QueryPanel'
import ResultsPanel from '../components/ResultsPanel'
import { getAnalyticConfig } from '../lib/guiApi'
import { getAnalyticFunctions } from '../lib/analyticApi'

class ContainerLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      analyticFunctions: [],
      selectedFunction: undefined,
      analyticEngines: [],
      analyticEngineApi: undefined
    }
    this.chooseAnalyticFunction = this.chooseAnalyticFunction.bind(this)
  }

  /**
   * At startup get array of analytic engine urls and available functions.
   */
  componentDidMount() {
    getAnalyticConfig('/analyticsgui/engineConfig')
      .then((json) => {
        this.setState({ analyticEngines: json.analyticList, analyticEngineApi: json.analyticApiRoot })
        return json
      })
      .then((json) => {
        return getAnalyticFunctions(json.analyticList, json.analyticApiRoot)
      })
      .then((json) => {
        this.setState({ analyticFunctions: json })
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  chooseAnalyticFunction = (funcName, selected) => {
    const selectedFunc = selected ? this.state.analyticFunctions.find(func => func.name === funcName) : undefined
    this.setState({ selectedFunction: selectedFunc })
  }

  render() {
    const functionNames = this.state.analyticFunctions.map(func => func.name)
    const analyticEngineURL = index =>
      this.state.analyticEngines.length > index ?
        this.state.analyticEngines[index] : undefined

    return (
      <Layout style={{ margin: '1em' }}
        analyticFunc={<AnalyticFunctionPanel
          functionNames={functionNames}
          selectedFunction={this.state.selectedFunction}
          chooseFunction={this.chooseAnalyticFunction} />}
        party1={<QueryPanel
          engineURL={analyticEngineURL(0)}
          engineAPI={this.state.analyticEngineApi} />}
        party2={<QueryPanel
          engineURL={analyticEngineURL(1)}
          engineAPI={this.state.analyticEngineApi} />}
        results={<ResultsPanel />}
      />
    )
  }
}

export default ContainerLayout
