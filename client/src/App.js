import React, { Component } from 'react'

import cryptologo from './crypto-logo.png'
import uoblogo from './uob-logo-white-largest.png'
import spdzlogo from './spdz_logo.svg'

import './components/globalCSS'
import AppBanner from './components/AppBanner'
import AppFooter from './components/AppFooter'
import Layout from './pages/layout'
import DisplayPanel from './components/DisplayPanel'

class App extends Component {
  render() {
    const genPanel = header => {
      return <DisplayPanel heading={header}>
        <div>Some content Second line.</div>
        <div>More content Second line.</div>
      </DisplayPanel>
    }


    return (
      <div>

        <AppBanner spdzLogo={spdzlogo} />

        <Layout style={{ margin: '1em' }}
          schema1={genPanel('Schema from acmebank.com')}
          schema2={genPanel('Schema from acmeinsurance.com')}
          analyticFunc={genPanel('Choose the analytic function')}
          query1={genPanel('Query for acmebank.com')}
          query2={genPanel('Query for acmebank.com')}
          results={genPanel('Results')}
        />

        <AppFooter uobLogo={uoblogo} cryptoLogo={cryptologo} />

      </div >
    )
  }
}

export default App