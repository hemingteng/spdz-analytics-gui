import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import DisplayPanel from './DisplayPanel'

const exampleInputs = {
  avg: {
    name: 'Average',
    description: 'Calculate avg as ∑ value / number of values.',
    example: 'select sum(col_1), count(col_1) from table_name where col2 > 1000',
    inputs: [
      { name: 'valueSum', type: 'int', byteSize: 4 },
      { name: 'valueCount', type: 'int', byteSize: 4 }
    ],
    inputRowCount: 1,
    outputs: [
      { name: 'result', type: 'float', byteSize: 16 }
    ],
    outputRowCount: 1
  }
}

/**
 * A lot of code to allow the list entry to be selected.
 */
const SelectableFunc = props => {
  const FuncLine = styled.li`
    list-style-type: none;
    &:hover {color: #e85a32};
    margin-top: 2px;
    margin-bottom: 0px;
    padding-left: 4px;
    text-align: left;
  `

  const toggleSelected = (event) => {
    event.stopPropagation()
    props.changeSelected(props.index, !props.selected)
  }

  const selectedStyle = () =>
    props.selected ? { background: '#ccc' } : { background: '#fff' }

  return (
    <FuncLine style={selectedStyle()} onClick={toggleSelected}>{props.functionName}</FuncLine>
  )
}

class AnalyticFunctionPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFunction: ''
    }
    this.changeSelected = this.changeSelected.bind(this)
  }

  changeSelected = (index, selected) => {
    this.setState({ selectedFunction: (selected ? index : undefined) })
  }

  render() {
    const GridLayout = styled(Grid) `
      padding: 0px 2px;
      margin: 3px 3 0 3;
    `
    const FuncList = styled.ul`
      border: 1px solid #ccc;
      padding: 0px 1px 2px 1px;
    `
    const DivFuncDetail = styled.div`
      border: 1px solid #ccc;
      padding: 0px 1px 2px 1px;
      text-align: left;
    `

    // table { 
    //   width: 100%; 
    //   border-collapse: collapse; 
    // }
    // /* Zebra striping */
    // tr:nth-of-type(odd) { 
    //   background: #eee; 
    // }
    // th { 
    //   background: #333; 
    //   color: white; 
    //   font-weight: bold; 
    // }
    // td, th { 
    //   padding: 6px; 
    //   border: 1px solid #ccc; 
    //   text-align: left; 
    // }

    const isSelected = index => {
      if (this.state === undefined) {
        return false
      } else {
        return this.state.selectedFunction === index
      }
    }

    return <DisplayPanel heading={'Choose the analytic function'}>
      <GridLayout fluid={true}>
        <Row>
          <Col md={2}>
            <FuncList>
              <SelectableFunc key={0} index={0} selected={isSelected(0)} functionName={'Average'} changeSelected={this.changeSelected} />
              <SelectableFunc key={1} index={1} selected={isSelected(1)} functionName={'Percentage Histogram'} changeSelected={this.changeSelected} />
            </FuncList>
          </Col>
          <Col md={10}>
            <DivFuncDetail>
              <dl>
                <div><dt>Description:</dt><dd>'Calculate avg as ∑ value / number of values.'</dd></div>
                <div><dt>Inputs:</dt><dd><table></table></dd></div>
              </dl>
              Second col content
            </DivFuncDetail>
          </Col>
        </Row>
      </GridLayout>
    </DisplayPanel>
  }
}

export default AnalyticFunctionPanel