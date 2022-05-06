const applyDrag = (arr, dropResult) => {
  const { removedIndex, addedIndex, payload } = dropResult

  if (removedIndex === null && addedIndex === null) return arr

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

const generateNewColumn = (boardId, title) => {
  const randomNumber = Math.floor(Math.random() * 100)

  return {
    id: `column-${randomNumber}`,
    boardId: boardId,
    title: title,
    cardOrder: [],
    cards: []
  }
}

export {
  applyDrag,
  generateNewColumn
}
