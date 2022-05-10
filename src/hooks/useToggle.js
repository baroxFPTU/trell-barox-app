import { useState } from 'react'

function useToggle(initualState = false) {
  const [isShowing, setIsShowing] = useState(initualState)

  const toggle = (customState) => {
    if (customState) { return setIsShowing(customState)}
    setIsShowing(!isShowing)
  }

  return [isShowing, toggle]
}

export default useToggle