import React from 'react';
import CardListItem from './CardListItem';

const CardList = (props) => {
  return (
    <div className="CardList">
      {props.cards.map((card) => (
        <CardListItem key={card.id} card={card} colors={props.colors} />
      ))}
    </div>
  );
};

export default React.memo(CardList);
