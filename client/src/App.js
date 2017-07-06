import React, { Component } from 'react'

import cryptologo from './crypto-logo.png'
import uoblogo from './uob-logo-white-largest.png'
import spdzlogo from './spdz_logo.svg'

import './components/globalCSS'
import AppBanner from './components/AppBanner'
import AppFooter from './components/AppFooter'
import DisplayPanel from './components/DisplayPanel'

class App extends Component {
  render() {
    return (
      <div className="App">

        <AppBanner spdzLogo={spdzlogo} />

        <div style={{ width: '50%', margin: '1em' }}>
          <DisplayPanel heading={'Server x schema'}>
            <div>Some content Second line.</div>
            <div>More content Second line.</div>
          </DisplayPanel>
        </div>

        <AppFooter uobLogo={uoblogo} cryptoLogo={cryptologo} />

      </div >
    )
  }
}

export default App