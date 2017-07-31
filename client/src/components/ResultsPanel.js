import React, { Component } from 'react'

import DisplayPanel from './DisplayPanel'

class ResultsPanel extends Component {
  render() {
    return <DisplayPanel heading={'Run Query'}>
      <div>Run and results Second line.</div>
      <div>More content Second line.</div>
    </DisplayPanel>
  }
}

export default ResultsPanel