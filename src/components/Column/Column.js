import ActionsDropdown from 'components/ActionsDropdown/ActionsDropdown'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './Column.scss'

function Column(props) {
  const { column, onUpdateColumn } = props
  const cards = column.cards
  const [showModal, setShowModal] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')
  const toggleShowModal = () => setShowModal(!showModal)

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

  const selectAllInsideText = (e) => {
    e.preventDefault()
    e.target.focus()
    e.target.select()
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

  const saveAllChangeOnEnter = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
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
          <ActionsDropdown onRemove={toggleShowModal}/>
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
      </div>
      <footer className="card-footer">
        <div className="footer-actions">
          <button className="add-card-btn">+ Add a card</button>
        </div>
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