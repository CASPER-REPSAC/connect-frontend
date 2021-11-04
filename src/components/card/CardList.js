import React from 'react';
import CardListItem from './CardListItem';
import '../../styles/CardList.scss';

const CardList = ({ n, cards, nowrap }) => {
  return (
    <>
      {nowrap ? (
        <div className="card-list nowrap">
          {cards &&
            cards.map((card) => <CardListItem key={card.id} card={card} />)}
        </div>
      ) : (
        <div className="card-list wrap">
          {cards &&
            cards.map((card) => <CardListItem key={card.id} card={card} />)}
        </div>
      )}
    </>
  );
};

export default React.memo(CardList);
