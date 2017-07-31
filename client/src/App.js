import React, { Component } from 'react'
import styled from 'styled-components'

import cryptologo from './crypto-logo.png'
import uoblogo from './uob-logo-white-largest.png'
import spdzlogo from './spdz_logo.svg'

import './lib/globalCSS'
import AppBanner from './components/AppBanner'
import ContainerLayout from './pages/ContainerLayout'
import AppFooter from './components/AppFooter'

class App extends Component {
  render() {
    const DivBody = styled.div`
      background-color: #F5F5F5;
    `
    return (
      <DivBody>
        <AppBanner spdzLogo={spdzlogo} />

        <ContainerLayout />

        <AppFooter uobLogo={uoblogo} cryptoLogo={cryptologo} />
      </DivBody>
    )
  }
}

export default App