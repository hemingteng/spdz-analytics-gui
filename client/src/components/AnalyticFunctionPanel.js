import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import colours from '../lib/colourScheme'
import DisplayPanel from './DisplayPanel'

const exampleInput = {
  avg: {
    name: 'avg',
    description: 'Calculate avg as \u03A3 (value) / number of values.',
    example: 'select sum(col_1), count(col_1) from table_name where col2 > 1000',
    inputs: [
      { name: 'valueSum', type: 'int', byteSize: 4 },
      { name: 'valueCount', type: 'int', byteSize: 4 }
    ],
    inputRowCount: 1,
    outputs: [
      {
        name: 'result',
        type: 'float'
      }
    ],
    outputRowCount: 1
  }
}

class AnalyticFunctionPanel extends Component {
  render() {

    const GridLayout = styled(Grid) `
      padding: 0px 2px;
      margin: 3px 3 0 3;
    `

    const DivFuncList = styled.div`
      border: 1px solid #ccc;
      padding: 0px 1px 2px 1px;
      text-align: left;
    `
    //TODO make this a list.
    const FuncLine = styled.p`
        margin-top: 2px;
        margin-bottom: 0px;
        padding-left: 4px;
    `

    const listBackground = index => index % 2 === 0 ? '#fff' : '#eee'

    return <DisplayPanel heading={'Choose the analytic function'}>
      <GridLayout fluid={true}>
        <Row>
          <Col md={2}>
            <DivFuncList>
              <FuncLine style={{ backgroundColor: listBackground(0) }}>Average</FuncLine>
              <FuncLine style={{ backgroundColor: listBackground(1) }}>Percentage Histogram</FuncLine>
            </DivFuncList>
          </Col>
          <Col md={10}>
            Second col content
          </Col>
        </Row>
      </GridLayout>
    </DisplayPanel>
  }
}

export default AnalyticFunctionPanel