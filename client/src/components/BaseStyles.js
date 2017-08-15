import styled from 'styled-components'
import colours from '../lib/colourScheme'

const DisplayBox = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
`

const codeFont = {
  fontFamily: 'Menlo,Monaco,Consolas,"Courier New",monospace',
  fontSize: '12.6px',
  color: '#c7254e'
}

const PanelHeaderText = styled.h4`
  font-size: 16px;
  padding-left: 0;
  margin-bottom: 5px;
  color: ${colours.darkPrimaryBackground};
`

export { DisplayBox, codeFont, PanelHeaderText }