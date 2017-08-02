import React from 'react'
import renderer from 'react-test-renderer'
import SchemaTableDisplay from './SchemaTableDisplay'

const testCols = { 'columns': { 'id': { 'type': 'int', 'maxLength': null }, 'amount': { 'type': 'int', 'maxLength': null }, 'ipAddress': { 'type': 'int', 'maxLength': null }, 'incidentDate': { 'type': 'datetime', 'maxLength': null } } }


describe('Schema table display renders as expected', () => {
  it('Renders as expected', () => {
    const tree = renderer.create(
      <SchemaTableDisplay tableName={'testTable'} colNames={testCols.columns} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
