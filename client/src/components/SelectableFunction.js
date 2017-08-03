/**
 * A component (and a lot of code) to allow the function name list entry to be selected.
 * Should use form select tag.
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FuncLine = styled.li`
  list-style-type: none;
  &:hover {color: firebrick};
  margin-top: 2px;
  margin-bottom: 0px;
  padding-left: 4px;
  text-align: left;
`

const SelectableFunction = props => {

  const toggleSelected = (event) => {
    props.changeSelected(props.functionName, !props.selected)
    event.preventDefault()
    event.stopPropagation()
  }

  const selectedStyle = () =>
    props.selected ? { background: '#d5d5d5' } : { background: '#fff' }

  return (
    <FuncLine style={selectedStyle()} onClick={toggleSelected}>{props.functionName}</FuncLine>
  )
}

SelectableFunction.propTypes = {
  functionName: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  changeSelected: PropTypes.func.isRequired
}

export default SelectableFunction