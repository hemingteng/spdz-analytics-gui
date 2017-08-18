/**
 * Manage startup config, coordinate state between components.
 */
import React, { Component } from 'react'
import Layout from './Layout'
import AnalyticFunctionPanel from '../components/AnalyticFunctionPanel'
import QueryPanel from '../components/QueryPanel'
import ResultsPanel from '../components/ResultsPanel'
import { getAnalyticConfig } from '../lib/guiApi'
import { getAnalyticFunctions } from '../lib/analyticRestApi'

class ContainerLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      analyticFunctions: [],
      analyticEngines: [],
      analyticEngineApi: undefined,
      selectedFunction: undefined,
      sqlQuery0: undefined,
      sqlQuery1: undefined
    }
    this.chooseAnalyticFunction = this.chooseAnalyticFunction.bind(this)
    this.storeSQLQuery = this.storeSQLQuery.bind(this)
  }

  /**
   * At startup get array of analytic engine urls and available functions.
   */
  componentDidMount() {
    getAnalyticConfig('/analyticsgui/engineConfig')
      .then(json => {
        this.setState({
          analyticEngines: json.analyticList,
          analyticEngineApi: json.analyticApiRoot
        })
        return json
      })
      .then(json => {
        return getAnalyticFunctions(json.analyticList, json.analyticApiRoot)
      })
      .then(json => {
        this.setState({ analyticFunctions: json })
      })
      .catch(ex => {
        console.log(ex)
      })
  }

  storeSQLQuery(party, query) {
    party === 0
      ? this.setState({ sqlQuery0: query })
      : this.setState({ sqlQuery1: query })
  }

  chooseAnalyticFunction = (funcName, selected) => {
    const selectedFunc = selected
      ? this.state.analyticFunctions.find(func => func.name === funcName)
      : undefined
    this.setState({ selectedFunction: selectedFunc })
  }

  render() {
    const functionNames = this.state.analyticFunctions.map(func => func.name)
    const analyticEngineURL = index =>
      this.state.analyticEngines.length > index
        ? this.state.analyticEngines[index]
        : undefined
    const getSelectedFunctionId = () =>
      this.state.selectedFunction !== undefined
        ? this.state.selectedFunction.id
        : undefined

    return (
      <Layout
        style={{ margin: '1em' }}
        analyticFunc={
          <AnalyticFunctionPanel
            functionNames={functionNames}
            selectedFunction={this.state.selectedFunction}
            chooseFunction={this.chooseAnalyticFunction}
          />
        }
        party1={
          <QueryPanel
            engineURL={analyticEngineURL(0)}
            engineAPI={this.state.analyticEngineApi}
            storeQuery={query => this.storeSQLQuery(0, query)}
          />
        }
        party2={
          <QueryPanel
            engineURL={analyticEngineURL(1)}
            engineAPI={this.state.analyticEngineApi}
            storeQuery={query => this.storeSQLQuery(1, query)}
          />
        }
        results={
          <ResultsPanel
            engineURLs={this.state.analyticEngines}
            selectedFunctionId={getSelectedFunctionId()}
            query1={this.state.sqlQuery0}
            query2={this.state.sqlQuery1}
          />
        }
      />
    )
  }
}

export default ContainerLayout
