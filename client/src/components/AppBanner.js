import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colours from './colourScheme'

const SpdzLogo = styled.img`
  height: 40px;
`

const Banner = styled.div`
	background-color: ${colours.darkPrimaryBackground};
  padding: 20px 15px 5px 15px;
  color: white;
`

const BannerHeader = styled.h4`
	color: ${colours.accentTextColor};
  margin: 10px;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
`

const AppBanner = props => {
  return (
    <Banner>
      <a title="Bristol Crypt Group SPDZ software" href="https://www.cs.bris.ac.uk/Research/CryptographySecurity/SPDZ/">
        <SpdzLogo src={props.spdzLogo} alt="SPDZ logo" />
      </a>
      <BannerHeader>Analytics MPC Demonstrator</BannerHeader>
    </Banner>
  )
}

AppBanner.propTypes = {
  spdzLogo: PropTypes.string.isRequired
}

export default AppBanner
