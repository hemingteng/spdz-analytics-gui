/**
 * Panel to display a DB schema table.
 */
import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { DisplayBox, codeFont } from './BaseStyles'

const DivDBTable = DisplayBox.extend`padding: 0px 2px 4px 2px;`
const TableSQL = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${codeFont.fontFamily};
  font-size: ${codeFont.fontSize};
  color: ${codeFont.color};
`
const TableCaption = styled.caption`padding-left: 4px;`
const TdCol = styled.td`
  padding: 0 6px 0 6px;
  border: none;
  text-align: left;
`

const SchemaTableDisplay = props => {
  const formatTableCols = colNames => {
    return Object.keys(colNames).map(colName =>
      <tr key={colName}>
        <TdCol>
          {colName}
        </TdCol>
        <TdCol>
          {colNames[colName].type} {colNames[colName].maxLength}
        </TdCol>
      </tr>
    )
  }

  return (
    <DivDBTable>
      <TableSQL>
        <TableCaption>
          {props.tableName}
        </TableCaption>
        <tbody>
          {formatTableCols(props.colNames)}
        </tbody>
      </TableSQL>
    </DivDBTable>
  )
}

SchemaTableDisplay.propTypes = {
  tableName: PropTypes.string.isRequired,
  colNames: PropTypes.object.isRequired
}

export default SchemaTableDisplay
