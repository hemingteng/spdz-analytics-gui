/**
 * Panel to contain content, displays header.
 */
import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { PanelHeaderText } from './BaseStyles'

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
  const deriveHeader = () => {
    if (typeof props.heading === 'string' || props.heading instanceof String) {
      return <PanelHeaderText>{props.heading}</PanelHeaderText>
    } else {
      return props.heading
    }
  }

  return (
    <div>
      <PanelHeader>
        {deriveHeader()}
      </PanelHeader>

      <StyledPanel>
        {props.children}
      </StyledPanel>
    </div>
  )
}

DisplayPanel.propTypes = {
  heading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
}

export default DisplayPanel
