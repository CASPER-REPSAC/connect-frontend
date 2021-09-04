import React from 'react';
import CardListItem from './CardListItem';
import '../../styles/CardList.scss';

const CardList = ({ n, cards }) => {
  if (n) {
    return (
      <div className="card-list">
        {cards &&
          cards.map((card) => <CardListItem key={card.id} card={card} />)}
      </div>
    );
  }

  if (!n) {
    return (
      <div className="card-list2">
        {cards &&
          cards.map((card) => <CardListItem key={card.id} card={card} />)}
      </div>
    );
  }
};

export default React.memo(CardList);
