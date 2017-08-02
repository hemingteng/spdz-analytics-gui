/**
 * Panel to contain content, displays header.
 */
import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import colours from '../lib/colourScheme'

const PanelHeader = styled.div`
    padding: 2px 8px;
    border-radius: 3px 3px 0 0;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 0px;
    background-color: #fff;
    text-align: left;
  `

const PanelText = styled.h4`
    font-size: 16px;
    padding-left: 0;
    margin-bottom: 5px;
    color: ${colours.darkPrimaryBackground};
  `

const StyledPanel = styled.div`
    background-color: #fff;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-radius: 0 0 3px 3px;
    margin: 0px;
    padding: 6px 6px 10px 6px;
  `

const DisplayPanel = props => {
  return (
    <div>
      <PanelHeader>
        <PanelText>{props.heading}</PanelText>
      </PanelHeader>

      <StyledPanel>
        {props.children}
      </StyledPanel>
    </div>
  )
}

DisplayPanel.propTypes = {
  heading: PropTypes.string.isRequired
}

export default DisplayPanel
