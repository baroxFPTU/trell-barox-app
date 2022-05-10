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
import './Column.scss'

function Column(props) {
  const { column, onUpdateColumn } = props
  const cards = column.cards
  const [showModal, setShowModal] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')
  const toggleShowModal = () => setShowModal(!showModal)
  const [isShowForm, toggleShowForm] = useToggle()

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  const handleActionsOnModal = (type) => {
    switch (type) {
    case 'confirm': {
      const newColumn = {
        ...column,
        _destroy: true
      }

      onUpdateColumn(newColumn)
      break
    }
    }

    toggleShowModal()
  }

  const changeColumnTitle = (e) => {
    setColumnTitle(e.target.value)
  }

  const updateColumnTitle = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }

    onUpdateColumn(newColumn)
  }

  const updateCard = (newCardTitle) => {
    const newColumn = cloneDeep(column)
    const newCard = generateNewCard(column.boardId, column.id, newCardTitle)
    newColumn.cards.push(newCard)
    newColumn.cardOrder.push(newCard.id)
    onUpdateColumn(newColumn)
  }

  return (
    <div className="column ">
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
          onDrop={dropResult => props.onCardDrop(column.id, dropResult)}
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