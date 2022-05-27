import useInput from 'hooks/useInput'
import React, { useRef } from 'react'
import { KEEPER_INPUT_ADD_NEW_COL } from 'utils/constants'
import './FormAddColumn.scss'

function FormAddColumn(props) {
  const { onSubmit, onClose } = props
  const inputRef = useRef(null)

  const { value: inputVal, handleChange, handleSubmit } = useInput('', onSubmit, inputRef, KEEPER_INPUT_ADD_NEW_COL)

  const submitOnEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <div className="form-add-column">
      <input
        type="text"
        placeholder="Enter list title..."
        value={inputVal}
        onChange={handleChange}
        ref={inputRef}
        onKeyDown={submitOnEnter}
      />
      <div className="group-actions">
        <button className="btn btn-primary"onClick={handleSubmit}>Add List</button>
        <button className="btn" onClick={onClose}>X</button>
      </div>
    </div>
  )
}

export default FormAddColumn