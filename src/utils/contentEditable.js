/**
 * Created by Barox Phan on 2022 05 08
 */

// Select all input value when trigger
const selectAllInsideText = (e) => {
  e.preventDefault()
  e.target.focus()
  e.target.select()
}

// On keydown
const saveAllChangeOnEnter = (e) => {
  if (e.key === 'Enter') {
    e.target.blur()
  }
}

export {
  selectAllInsideText,
  saveAllChangeOnEnter
}