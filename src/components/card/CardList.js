import React from 'react';
import CardListItem from './CardListItem';

const CardList = ({ cards, tagColors }) => {
  return (
    <div className="CardList">
      {cards.map((card) => (
        <CardListItem key={card.id} card={card} tagColors={tagColors} />
      ))}
    </div>
  );
};

export default React.memo(CardList);
