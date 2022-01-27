import React from 'react';
import CardListItem from './CardListItem';
import ChapterCardItem from './ChapterCardItem';
import '../../styles/CardList.scss';
import { NoCards } from '../common/NoCards';

const CardList = ({ cards, nowrap }) => {
  let wrapState = 'wrap';
  if (nowrap) {
    wrapState = 'nowrap';
  }
  return (
    <>
      {cards && Array.isArray(cards) && cards.length !== 0 ? (
        <>
          <div className={`card-list ${wrapState}`}>
            {cards.map((card, index) => {
              const isActivity = Object.keys(card).includes('participants');
              // console.log(card);
              if (isActivity) {
                return (
                  <>
                    <CardListItem key={card.id} card={card} />
                  </>
                );
              } else {
                return <ChapterCardItem card={card} key={card.id} />;
              }
            })}
          </div>
        </>
      ) : (
        <>
          <NoCards margin="5px" />
        </>
      )}
    </>
  );
};

export default React.memo(CardList);
