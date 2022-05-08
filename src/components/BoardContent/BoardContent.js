import { initialData } from 'actions/initialData'
import Column from 'components/Column/Column'
import FormAddColumn from 'components/FormAddColumn/FormAddColumn'
import { KEEPER_INPUT_ADD_NEW_COL } from 'constants/localStorage'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag, generateNewColumn } from 'utils/main'
import { mapOrder } from 'utils/sorts'
import './BoardContent.scss'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }

    return () => {
      localStorage.removeItem(KEEPER_INPUT_ADD_NEW_COL)
    }
  }, [])

  if (isEmpty(board)) {
    return <div>Board is not found.</div>
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    let newBoard = { ...board }

    newColumns = applyDrag(newColumns, dropResult)
    newBoard.columnOrder = newColumns.map(col => col.id)
    newBoard.columns = [...newColumns]

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find(col => col.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(item => item.id)
      setColumns(newColumns)
    }
  }

  const handleOpenForm = () => {
    setIsAdding(true)
  }

  const handleCloseForm = () => {
    setIsAdding(false)
  }

  const handleAddColumn = (inputVal) => {
    const newBoard = { ...board }
    const newColumns = [...columns]
    const newColumn = generateNewColumn(board.id, inputVal)

    newColumns.push(newColumn)
    newBoard.columnOrder = newColumns.map(col => col.id)

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const updateColumn = (newColumn) => {
    const columnIdToUpdate = newColumn.id

    if (!columnIdToUpdate) return

    const newBoard = { ...board }
    const newColumns = [...columns]
    const columnIndex = newColumns.findIndex(column => column.id === columnIdToUpdate)

    if (newColumn._destroy) {
      //Remove
      newColumns.splice(columnIndex, 1)
    } else {
      //Update
      newColumns.splice(columnIndex, 1, newColumn)
    }

    newBoard.columnOrder = newColumns.map(col => col.id)
    setColumns(newColumns)
    setBoard(newBoard)
  }

  return (
    <div className="board-columns">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => (columns[index])}
        dragHandleSelector={'.column-drag-handle'}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'columns-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={updateColumn}/>
          </Draggable>
        ))}
      </Container>
      <div className="column">
        {!isAdding && <button className="add-column-btn" onClick={handleOpenForm}>+ Add another list</button>}
        {isAdding && <FormAddColumn onSubmit={handleAddColumn} onClose={handleCloseForm}/>}
      </div>
    </div>
  )
}

export default BoardContent