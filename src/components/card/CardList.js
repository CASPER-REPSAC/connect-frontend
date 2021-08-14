import React from 'react';
import CardListItem from './CardListItem';
import '../../styles/CardList.scss';

const CardList = (props) => {
  return (
    <div className="card-list">
      {props.cards.map((card) => (
        <CardListItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default React.memo(CardList);
