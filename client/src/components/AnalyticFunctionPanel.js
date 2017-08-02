/**
 * Panel to display the list of available analytic functions and allow one to be selected. 
 * All read only.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import DisplayPanel from './DisplayPanel'
import { DisplayBox, codeFont } from './BaseStyles'

/**
 * A component (and a lot of code) to allow the function name list entry to be selected.
 * Should use form select tag.
 */
const SelectableFunc = props => {
  const FuncLine = styled.li`
    list-style-type: none;
    &:hover {color: firebrick};
    margin-top: 2px;
    margin-bottom: 0px;
    padding-left: 4px;
    text-align: left;
  `

  const toggleSelected = (event) => {
    props.changeSelected(props.functionName, !props.selected)
    event.preventDefault()
    event.stopPropagation()
  }

  const selectedStyle = () =>
    props.selected ? { background: '#ccc' } : { background: '#fff' }

  return (
    <FuncLine style={selectedStyle()} onClick={toggleSelected}>{props.functionName}</FuncLine>
  )
}

const AnalyticFunctionPanel = props => {

  const GridLayout = styled(Grid) `
      padding: 0px 2px;
      margin: 3px 3 0 3;
    `
  const ColNoPad = styled(Col) `
      padding-right: 0;
    `
  const UlFuncList = styled.ul`
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0px 1px 2px 1px;
    `
  const DivFuncDetail = DisplayBox.extend`
      padding: 0px 1px 2px 1px;
    `
  const TableMain = styled.table` 
      width: 100%; 
      border-collapse: collapse; 
    `
  const TdMain = styled.td`
      padding: 6px;
      border: none;
      text-align: left;
      font-family: ${codeFont.fontFamily};
      font-size: ${codeFont.fontSize};
      color: ${codeFont.color};
    `
  const TdMainSub = TdMain.extend`
      padding: 0;
    `
  const TdDetail = TdMain.extend`
      padding: 0 0 0 6px;
    `
  const TdLabel = styled.td`
      color: #888;
      width: 8em;
      text-align: right;
      vertical-align: top;
      padding: 6px;
      padding-right: 1em;       
      border: none;
    `
  const DivFuncExample = DivFuncDetail.extend`
      padding: 6px;
    `
  const PQueryLabel = styled.p`
      color: #888;    
    `
  const ThLabel = TdLabel.extend`
      text-align:left;
    `
  const CodeStyled = styled.code`
      white-space: pre-wrap;
      margin: 0;
      width: 100%;
      font-family: ${codeFont.fontFamily};
      font-size: ${codeFont.fontSize};
      color: ${codeFont.color};
    `

  const isSelected = name => {
    if (props.selectedFunction === undefined) {
      return false
    } else {
      return props.selectedFunction.name === name
    }
  }

  const selectableFunctionNames = props.functionNames.map(name =>
    <SelectableFunc key={name} selected={isSelected(name)} functionName={name} changeSelected={props.chooseFunction} />
  )

  const ioRows = (func, prop) => {
    if (func !== undefined) {
      return func[prop].map((input, index) =>
        <tr key={index}>
          <TdDetail>{input.name}</TdDetail>
          <TdDetail>{input.type}</TdDetail>
          <TdDetail>{input.byteSize}</TdDetail>
        </tr>
      )
    } else {
      return <tr>
        <TdDetail>-</TdDetail>
        <TdDetail>-</TdDetail>
        <TdDetail>-</TdDetail>
      </tr>
    }
  }

  return (
    <DisplayPanel heading={'Choose the analytic function'}>
      <GridLayout fluid={true}>
        <Row>
          <ColNoPad md={2}>
            <UlFuncList>
              {selectableFunctionNames}
            </UlFuncList>
          </ColNoPad>
          <ColNoPad md={5}>
            <DivFuncDetail>
              <TableMain>
                <tbody>
                  <tr>
                    <TdLabel>Description:</TdLabel>
                    <TdMain>{props.selectedFunction !== undefined ? props.selectedFunction.description : '-'}</TdMain>
                  </tr>
                  <tr>
                    <TdLabel>Inputs:</TdLabel>
                    <TdMainSub>
                      <TableMain>
                        <thead>
                          <tr>
                            <ThLabel>Name</ThLabel>
                            <ThLabel>Type</ThLabel>
                            <ThLabel>Byte Size</ThLabel>
                          </tr>
                        </thead>
                        <tbody>
                          {ioRows(props.selectedFunction, 'inputs')}
                        </tbody>
                      </TableMain>
                    </TdMainSub>
                  </tr>
                  <tr>
                    <TdLabel>Outputs:</TdLabel>
                    <TdMainSub>
                      <TableMain>
                        <thead>
                          <tr>
                            <ThLabel>Name</ThLabel>
                            <ThLabel>Type</ThLabel>
                            <ThLabel>Byte Size</ThLabel>
                          </tr>
                        </thead>
                        <tbody>
                          {ioRows(props.selectedFunction, 'outputs')}
                        </tbody>
                      </TableMain>
                    </TdMainSub>
                  </tr>
                </tbody>
              </TableMain>
            </DivFuncDetail>
          </ColNoPad>
          <Col md={5}>
            <DivFuncExample>
              <PQueryLabel>Example query:</PQueryLabel>
              <CodeStyled>{props.selectedFunction !== undefined ? props.selectedFunction.example : 'Select an analytic function.'}</CodeStyled>
            </DivFuncExample>
          </Col>
        </Row>
      </GridLayout>
    </DisplayPanel>
  )
}

AnalyticFunctionPanel.propTypes = {
  functionNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFunction: PropTypes.object,
  chooseFunction: PropTypes.func.isRequired
}

export default AnalyticFunctionPanel