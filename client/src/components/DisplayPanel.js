/**
 * Panel to contain content, displays header.
 */
import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import colours from './colourScheme'

const DisplayPanel = props => {

  const PanelHeader = styled.div`
    padding: 2px 8px;
    border-radius: 3px 3px 0 0;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #bbb;
    background: ${colours.lightPrimaryBackground};
    text-align: left;
  `

  const PanelText = styled.h4`
    font-size: 16px;
    padding-left: 0;
    color: ${colours.primaryTextColor};
  `

  const StyledPanel = styled.div`
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-radius: 0 0 3px 3px;
    margin: 0px;
    padding: 6px;
  `

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
