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

const functions = [
  {
    id: 'avg',
    name: 'Average',
    description: 'Calculate avg as \u03A3 localSum / \u03A3 localCount.',
    example: 'select sum(col_1), count(col_1) \n  from table_name \n where col2 > 1000',
    inputs: [
      { name: 'localSum', type: 'int', byteSize: 4 },
      { name: 'localCount', type: 'int', byteSize: 4 }
    ],
    inputRowCount: 1,
    outputs: [
      { name: 'result', type: 'float', byteSize: 16 }
    ],
    outputRowCount: 1
  },
  {
    id: 'phist',
    name: 'Percentage Histogram',
    description: 'Aggregate histogram of index, count and convert count to percentage.',
    example: 'select hour(incidentDate), count(*) \n  from table_name \n group by hour(incidentDate)',
    inputs: [
      { name: 'xIndex', type: 'int', byteSize: 4 },
      { name: 'yCount', type: 'int', byteSize: 4 }
    ],
    inputRowCount: 24,
    outputs: [
      { name: 'xIndex', type: 'float', byteSize: 16 },
      { name: 'yPercent', type: 'float', byteSize: 16 }
    ],
    outputRowCount: 24
  }
]

class ContainerLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      analyticFunctions: [],
      selectedFunction: undefined,
      analyticEngines: [],
      analyticEngineApi: '/analyticsapi'
    }
    this.chooseAnalyticFunction = this.chooseAnalyticFunction.bind(this)
  }

  /**
   * At startup get array of analytic engine urls.
   */
  componentDidMount() {
    getAnalyticConfig('/analyticsgui/engineConfig')
      .then((json) => {
        this.setState({ analyticEngines: json.analyticList })
        this.setState({ analyticEngineApi: json.analyticApiRoot })
        return json.analyticList
      })
      .then((analyticEngines) => {
        return getAnalyticFunctions(analyticEngines)
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

    return (
      <Layout style={{ margin: '1em' }}
        analyticFunc={<AnalyticFunctionPanel
          functionNames={functionNames}
          selectedFunction={this.state.selectedFunction}
          chooseFunction={this.chooseAnalyticFunction} />}
        party1={<QueryPanel header='Query for acmebank.com' />}
        party2={<QueryPanel header='Query for acmeinsurance.com' />}
        results={<ResultsPanel />}
      />
    )
  }
}

export default ContainerLayout
