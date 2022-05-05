import Card from 'components/Card/Card'
import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './Column.scss'


function Column(props) {
  const { column } = props
  const cards = column.cards


  return (
    <div className="column ">
      <header className='column-drag-handle'>{column.title}</header>
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
    </div>
  )
}

export default Column