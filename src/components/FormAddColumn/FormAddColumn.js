import { KEEPER_INPUT_ADD_NEW_COL } from 'constants/localStorage'
import useInput from 'hooks/useInput'
import React, { useEffect, useRef, useState } from 'react'
import './FormAddColumn.scss'

function FormAddColumn(props) {
  const { onSubmit, onClose } = props
  const inputRef = useRef(null)

  const { value: inputVal, handleChange, handleSubmit } = useInput('', onSubmit, inputRef, KEEPER_INPUT_ADD_NEW_COL)

  return (
    <div className="form-add-column">
      <input
        type="text"
        placeholder="Enter list title..."
        value={inputVal}
        onChange={handleChange}
        ref={inputRef}
      />
      <div className="group-actions">
        <button className="btn btn-primary"onClick={handleSubmit}>Add List</button>
        <button className="btn" onClick={onClose}>X</button>
      </div>
    </div>
  )
}

export default FormAddColumn