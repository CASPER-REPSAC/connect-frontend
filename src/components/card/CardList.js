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
          {console.log(cards)}
          <div className={`card-list ${wrapState}`}>
            {cards.map((card) => {
              const isChapter = Object.keys(card).includes('chapterid');
              if (isChapter) {
                return (
                  <>
                    <ChapterCardItem card={card} />
                  </>
                );
              }
              return <CardListItem key={card.id} card={card} />;
            })}
          </div>
        </>
      ) : (
        <>
          <NoCards />
        </>
      )}
    </>
  );
};

export default React.memo(CardList);
