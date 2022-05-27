const applyDrag = (arr, dropResult) => {
  const { removedIndex, addedIndex, payload } = dropResult

  if (removedIndex === null && addedIndex === null && payload==null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

/**
 * @param {String} boardId
 * @param {String} title
 * @returns {Object} boardId, title
 */
const generateNewColumn = (boardId, title) => {
  return {
    boardId: boardId,
    title: title
  }
}

/**
 * @param {String} boardId
 * @param {String} columnId
 * @param {String} title
 * @returns boardId, columnId, title
 */
const generateNewCard = (boardId, columnId, title) => {
  return {
    boardId: boardId,
    columnId: columnId,
    title: title
  }
}

export {
  applyDrag,
  generateNewColumn,
  generateNewCard
}
