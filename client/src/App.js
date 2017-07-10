import React, { Component } from 'react'
import styled from 'styled-components'

import cryptologo from './crypto-logo.png'
import uoblogo from './uob-logo-white-largest.png'
import spdzlogo from './spdz_logo.svg'

import './lib/globalCSS'
import AppBanner from './components/AppBanner'
import AppFooter from './components/AppFooter'
import AnalyticFunctionPanel from './components/AnalyticFunctionPanel'
import QueryPanel from './components/QueryPanel'
import Layout from './pages/layout'
import ResultsPanel from './components/ResultsPanel'

class App extends Component {
  render() {
    const DivBody = styled.div`
      background-color: #F5F5F5;
    `
    return (
      <DivBody>
        <AppBanner spdzLogo={spdzlogo} />

        <Layout style={{ margin: '1em' }}
          analyticFunc={<AnalyticFunctionPanel />}
          party1={<QueryPanel header='Query for acmebank.com' />}
          party2={<QueryPanel header='Query for acmeinsurance.com' />}
          results={<ResultsPanel />}
        />

        <AppFooter uobLogo={uoblogo} cryptoLogo={cryptologo} />
      </DivBody>
    )
  }
}

export default App