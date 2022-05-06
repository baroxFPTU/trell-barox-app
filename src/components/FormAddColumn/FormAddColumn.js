import { KEEPER_INPUT_ADD_NEW_COL } from 'constants/localStorage'
import React, { useEffect, useRef, useState } from 'react'
import './FormAddColumn.scss'

function FormAddColumn(props) {
  const inputRef = useRef(null)
  const [inputVal, setInputVal] = useState(() => {
    if (localStorage.getItem(KEEPER_INPUT_ADD_NEW_COL)) {
      return localStorage.getItem(KEEPER_INPUT_ADD_NEW_COL)
    }

    return ''
  })
  const { onSubmit, onClose } = props

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => {
      localStorage.setItem(KEEPER_INPUT_ADD_NEW_COL, inputVal)
    }, 300)

    return () => clearTimeout(timerId)
  }, [inputVal])

  const handleChangeVal = (e) => {
    setInputVal(e.target.value)
  }

  const handeSubmit = () => {
    if (inputVal.trim() !== '') {
      onSubmit(inputVal)
      setInputVal('')
      localStorage.removeItem(KEEPER_INPUT_ADD_NEW_COL)
      inputRef.current.focus()
    }
  }

  return (
    <div className="form-add-column">
      <input
        type="text"
        placeholder="Enter list title..."
        value={inputVal}
        onChange={handleChangeVal}
        ref={inputRef}
      />
      <div className="group-actions">
        <button className="btn btn-primary"onClick={handeSubmit}>Add List</button>
        <button className="btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default FormAddColumn;