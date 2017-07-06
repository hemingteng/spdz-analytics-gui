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

  return (
    <Grid fluid={true} style={{ padding: '0px 2px', margin: '1rem 1rem 0 1rem' }}>
      <Row>
        <Col md={4}>
          <DivWithMargin>
            {props.schema1}
          </DivWithMargin>
        </Col>
        <Col md={4}>
          <DivWithMargin>
            {props.analyticFunc}
          </DivWithMargin>
        </Col>
        <Col md={4}>
          <DivWithMargin>
            {props.schema2}
          </DivWithMargin>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <DivWithMargin>
            {props.query1}
          </DivWithMargin>
        </Col>
        <Col md={6}>
          <DivWithMargin>
            {props.query2}
          </DivWithMargin>
        </Col>
      </Row>
      <Row>
        <Col md={6} mdOffset={3}>
          <DivWithMargin>
            {props.results}
          </DivWithMargin>
        </Col>
      </Row>
    </Grid>
  )
}

Layout.propTypes = {
  schema1: PropTypes.element.isRequired,
  schema2: PropTypes.element.isRequired,
  analyticFunc: PropTypes.element.isRequired,
  query1: PropTypes.element.isRequired,
  query2: PropTypes.element.isRequired,
  results: PropTypes.element.isRequired
}

export default Layout
