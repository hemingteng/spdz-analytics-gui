import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DisplayPanel from './DisplayPanel'

class QueryPanel extends Component {
  render() {
    return <DisplayPanel heading={this.props.header}>
      <div>Query panel Second line.</div>
      <div>More content Second line.</div>
    </DisplayPanel>
  }
}

QueryPanel.propTypes = {
  header: PropTypes.string.isRequired
}

export default QueryPanel