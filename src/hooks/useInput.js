import { useEffect, useState } from 'react'

function useInput(initialValue, onSubmit, inputRef, saveNameLocal) {
  const [inputVal, setInputVal] = useState(() => {
    if (localStorage.getItem(saveNameLocal)) {
      return localStorage.getItem(saveNameLocal)
    }

    return initialValue
  })

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }

    // return () => {
    //   if (saveNameLocal) localStorage.removeItem(saveNameLocal)
    // }
  }, [])

  useEffect(() => {
    if (!saveNameLocal) return
    const timerId = setTimeout(() => {
      localStorage.setItem(saveNameLocal, inputVal)
    }, 300)

    return () => clearTimeout(timerId)
  }, [inputVal, saveNameLocal])

  const handleChangeVal = (e) => {
    setInputVal(e.target.value)
  }

  const handleSubmit = () => {
    if (inputVal.trim() !== '') {
      onSubmit(inputVal)
      setInputVal('')
      if (saveNameLocal) localStorage.removeItem(saveNameLocal)
      inputRef.current.focus()
    } else {
      inputRef.current.focus()
    }
  }

  return {
    value: inputVal,
    handleChange: handleChangeVal,
    handleSubmit: handleSubmit
  }
}

export default useInput