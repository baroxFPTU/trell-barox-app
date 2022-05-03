import Column from 'components/Column/Column'
import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import { initialData } from 'actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utils/sorts'
import { Container, Draggable } from 'react-smooth-dnd'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() =>{
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  if (isEmpty(board)) {
    return <div>Board is not found.</div>
  }

  // const swapElement = ()

  const onColumnDrop = (dropResult) => {
    const removedIndex = dropResult.removedIndex
    const addedIndex = dropResult.addedIndex

    console.log(dropResult);
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
            <Column column={column}/>
          </Draggable>
        ))}
      </Container>
    </div>
  );
}

export default BoardContent