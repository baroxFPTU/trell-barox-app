import Column from 'components/Column/Column'
import FormAddColumn from 'components/FormAddColumn/FormAddColumn'
import { KEEPER_INPUT_ADD_NEW_COL } from 'utils/constants'
import useToggle from 'hooks/useToggle'
import { isEmpty, cloneDeep, isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag, generateNewColumn } from 'utils/main'
import { mapOrder } from 'utils/sorts'
import './BoardContent.scss'
import { BoardAPIs, CardAPIs, ColumnAPIs } from 'actions/api'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [isShowForm, toggleShowForm] = useToggle()

  useEffect(() => {
    const boardId = '628310456c0ad2c3cbb9aa92'
    BoardAPIs.getAll(boardId)
      .then(board => {
        setBoard(board)
        setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
      })
      .catch(error => console.error(error))
    return () => {
      localStorage.removeItem(KEEPER_INPUT_ADD_NEW_COL)
    }
  }, [])

  if (isEmpty(board)) {
    return <div>Board is not found.</div>
  }

  const onColumnDrop = async (dropResult) => {
    let newColumns = cloneDeep(columns)
    let newBoard = cloneDeep(board)
    newColumns = applyDrag(newColumns, dropResult)
    newBoard.columnOrder = newColumns.map(col => col._id)
    newBoard.columns = [...newColumns]

    if (isEqual(newBoard.columnOrder, board.columnOrder)) return

    setColumns(newColumns)
    setBoard(newBoard)
    try {
      await BoardAPIs.update(newBoard._id, newBoard)
    } catch (error) {
      setColumns(columns)
      setBoard(board)
      //TODO: show error message to user
    }
  }

  const onCardDrop = async (columnId, dropResult) => {
    if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
      if (dropResult.addedIndex === dropResult.removedIndex) { return}

      let newColumns = [...columns] // use cloneDeep make bug
      let currentColumn = newColumns.find(col => col._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(item => item._id)
      setColumns(newColumns)
      try {
        if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
          await ColumnAPIs.update(columnId, currentColumn)
        } else {
          const updateColumn = {
            ...currentColumn
          }
          if (dropResult.addedIndex !== null) {
            const currentCard = cloneDeep(dropResult.payload)
            // currentCard.columnId = currentColumn._id
            updateColumn._cardId = currentCard._id
            // await CardAPIs.update(currentCard._id, { columnId: currentColumn._id })
          }
          console.log(updateColumn);

          await ColumnAPIs.update(columnId, updateColumn)
        }
      } catch (error) {
        //TODO: Show error message to users
        console.error(error.message)
        setColumns(columns)
      }

    }
  }

  const handleOpenForm = () => {
    toggleShowForm(true)
  }

  const handleCloseForm = () => {
    toggleShowForm(false)
  }

  const handleAddColumn = async (title) => {
    const newBoard = { ...board }
    const newColumns = [...columns]
    const newColumn = generateNewColumn(board._id, title)

    try {
      const createdColumn = await ColumnAPIs.createNew(newColumn)
      newColumns.push(createdColumn)
      newBoard.columnOrder = newColumns.map(col => col._id)

      setColumns(newColumns)
      setBoard(newBoard)
    } catch (error) {
      console.error(error.message)
    }
  }

  const updateColumn = (newColumn) => {
    const columnIdToUpdate = newColumn._id
    if (!columnIdToUpdate) return

    const newBoard = { ...board }
    const newColumns = [...columns]
    const columnIndex = newColumns.findIndex(column => column._id === columnIdToUpdate)

    if (newColumn._destroy) {
      //Remove
      newColumns.splice(columnIndex, 1)
    } else {
      //Update
      newColumns.splice(columnIndex, 1, newColumn)
    }

    newBoard.columnOrder = newColumns.map(col => col._id)
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
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={updateColumn}
            />
          </Draggable>
        ))}
      </Container>
      <div className="column">
        {!isShowForm && <button className="add-column-btn" onClick={handleOpenForm}>+ Add another list</button>}
        {isShowForm && <FormAddColumn onSubmit={handleAddColumn} onClose={handleCloseForm}/>}
      </div>
    </div>
  )
}

export default BoardContent