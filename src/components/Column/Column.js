import { CardAPIs, ColumnAPIs } from 'actions/api'
import ActionsDropdown from 'components/ActionsDropdown/ActionsDropdown'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import FormAddCard from 'components/FormAddCard/FormAddCard'
import useToggle from 'hooks/useToggle'
import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { saveAllChangeOnEnter, selectAllInsideText } from 'utils/contentEditable'
import { generateNewCard } from 'utils/main'
import { mapOrder } from 'utils/sorts'
import './Column.scss'

function Column(props) {
  const { column, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, '_id')
  const [showModal, setShowModal] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')
  const toggleShowModal = () => setShowModal(!showModal)
  const [isShowForm, toggleShowForm] = useToggle()

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  const handleActionsOnModal = async (type) => {
    switch (type) {
    case 'confirm': {
      const newColumn = {
        ...column,
        _destroy: true
      }

      const updatedColumn = await ColumnAPIs.update(newColumn._id, newColumn)
      onUpdateColumn(updatedColumn)
      break
    }
    }

    toggleShowModal()
  }

  const changeColumnTitle = (e) => {
    setColumnTitle(e.target.value)
  }

  const updateColumnTitle = async () => {
    const newColumn = {
      ...column,
      title: columnTitle.trim()
    }

    if (newColumn.title === column.title) return

    onUpdateColumn(newColumn)
    try {
      // const updatedColumn = 
      await ColumnAPIs.update(newColumn._id, newColumn)
      // updatedColumn.cards = [...newColumn.cards]
    } catch (error) {
      onUpdateColumn(column)
      // TODO: show error messgage to user
    }
  }

  const updateCard = async (newCardTitle) => {
    const newColumn = cloneDeep(column)
    const newCard = generateNewCard(column.boardId, column._id, newCardTitle)
    try {
      const createdCard = await CardAPIs.createNew(newCard)
      newColumn.cards.push(createdCard)
      newColumn.cardOrder.push(createdCard._id)
      onUpdateColumn(newColumn)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="column">
      <header className='column-drag-handle'>
        <div className="column-title">
          <input
            className="trello-content-editable"
            type="text"
            value={columnTitle}
            onClick={selectAllInsideText}
            onChange={changeColumnTitle}
            onBlur={updateColumnTitle}
            onKeyDown={saveAllChangeOnEnter}
            onMouseDown={e => e.preventDefault()}
          />
        </div>
        <div className="column-actions">
          <ActionsDropdown onRemove={toggleShowModal} onAdd={toggleShowForm}/>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDrop={dropResult => props.onCardDrop(column._id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card}/>
            </Draggable>
          ))}
        </Container>
        {isShowForm && <Card as={FormAddCard} onClose={toggleShowForm} onAddNew={updateCard}/>}
      </div>
      <footer>
        {!isShowForm && <div className="footer-actions">
          <button className="add-card-btn" onClick={toggleShowForm}>+ Add a card</button>
        </div>}
      </footer>
      <ConfirmModal
        title={'Xoa column'}
        content={`Are you sure you want to remove ${column.title} column?`}
        show={showModal}
        onActions={handleActionsOnModal}
      />
    </div>
  )
}

export default Column