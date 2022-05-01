import React from 'react';
import './Card.scss';

function Card({card}) {
  return (
    <li>
      {card.cover && <img src={card.cover} alt={card.title} />}
      {card.title}
    </li>
  );
}

export default Card;