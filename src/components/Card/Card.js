import React from 'react'
import './Card.scss'

function Card({ card, as: CustomComponent, ...props }) {
  if (CustomComponent) {
    return <CustomComponent className="card-item" {...props} />
  }

  return (
    <div className="card-item">
      {card.cover && <img src={card.cover} alt={card.title} draggable="false"/>}
      {card.title}
    </div>
  )
}

export default Card