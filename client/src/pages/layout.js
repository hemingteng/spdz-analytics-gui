/**
 * Presentation component to manage layout of analytics GUI using Bootstrap grid.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'


const Layout = props => {
  const DivWithMargin = styled.div`
    margin-bottom: 1rem;
  `

  const GridLayout = styled(Grid) `
    padding: 0px 2px;
    margin: 1rem 1rem 0 1rem;
  `

  const ColNoPad = styled(Col) `
    padding-right: 0;
  `

  return (
    <GridLayout fluid={true}>
      <Row>
        <Col md={12}>
          <DivWithMargin>
            {props.analyticFunc}
          </DivWithMargin>
        </Col>
      </Row>
      <Row>
        <ColNoPad md={6}>
          <DivWithMargin>
            {props.party1}
          </DivWithMargin>
        </ColNoPad>
        <Col md={6}>
          <DivWithMargin>
            {props.party2}
          </DivWithMargin>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DivWithMargin>
            {props.results}
          </DivWithMargin>
        </Col>
      </Row>
    </GridLayout>
  )
}

Layout.propTypes = {
  party1: PropTypes.element.isRequired,
  party2: PropTypes.element.isRequired,
  analyticFunc: PropTypes.element.isRequired,
  results: PropTypes.element.isRequired
}

export default Layout
