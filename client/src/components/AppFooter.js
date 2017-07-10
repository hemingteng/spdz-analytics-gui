import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colours from '../lib/colourScheme'

const Footer = styled.footer`
	background-color: ${colours.accentBackground};
  display: -webkit-flex;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 10px;
  color: ${colours.accentTextColor};
  text-align: left;
`

const ColLeft = styled.div`
  flex: 1;
`

const ColRight = styled.div`
  flex: 1;
  text-align: right;
`

const ImgRight = styled.img`
  margin: 0 0 0rem auto;
  display: block;
`

const AppFooter = props => {
  return (
    <Footer>
      <ColLeft>
        <a title="University of Bristol homepage" href="http://www.bristol.ac.uk">s
          <img src={props.uobLogo} alt="UOB logo" />
        </a>
      </ColLeft>
      <ColRight>
        <a title="Bristol Cryptography Group" href="http://www.cs.bris.ac.uk/Research/CryptographySecurity/">
          <ImgRight src={props.cryptoLogo} alt="crypto logo" />
        </a>
      </ColRight>
    </Footer>
  )
}

AppFooter.propTypes = {
  uobLogo: PropTypes.string.isRequired,
  cryptoLogo: PropTypes.string.isRequired
}

export default AppFooter
