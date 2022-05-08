import React from 'react'
import { Dropdown } from 'react-bootstrap'
import './ActionsDropdown.scss'

function ActionsDropdown(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Add ...</Dropdown.Item>
        <Dropdown.Item onClick={props.onRemove}>Achive ...</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else ...</Dropdown.Item>
      </Dropdown.Menu>
  </Dropdown>
  )
}

export default ActionsDropdown