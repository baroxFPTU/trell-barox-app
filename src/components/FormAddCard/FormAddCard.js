import useInput from 'hooks/useInput'
import React, { useRef } from 'react'
import './FormAddCard.scss'

function FormAddCard(props) {
  const inputRef = useRef()
  const { value: inputVal, handleChange, handleSubmit } = useInput('', onSubmit, inputRef)
  const { className, onClose, onAddNew } = props

  function onSubmit(value) {
    onAddNew(value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <>
      <div className={`${className} form-add-card`}>
        <textarea
          type="text"
          placeholder="Enter list title..."
          rows={2}
          value={inputVal}
          onChange={handleChange}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="group-actions">
        <button className="btn btn-primary" onClick={handleSubmit}>Add card</button>
        <button className="btn" onClick={() => onClose()}>X</button>
      </div>
    </>
  )
}

export default FormAddCard