import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecentBox from '../components/common/RecentBox';
import CardList from '../components/card/CardList';
import { getListData } from '../modules/api';

import { NoCards } from '../components/common/NoCards';

// import '../styles/MainPage.scss';

const MainPage = () => {
  const [cards, setCards] = useState();
  useEffect(() => {
    getListData('/api/activities/', setCards);
  }, []);

  return (
    <div className="main-page">
      {cards && cards[0] ? (
        <>
          <RecentBox cards={cards} />

          <br />
          <h3>Currently Running</h3>
          <CardList
            n={true}
            cards={cards.filter((card) => card.currentState === 1)}
          />
          <br />
          <h3>Planned</h3>
          <CardList
            n={true}
            cards={cards.filter((card) => card.currentState === 0)}
          />
          <br />
          <h3>Ended</h3>
          <CardList
            n={true}
            cards={cards.filter((card) => card.currentState === 2)}
          />
        </>
      ) : (
        <>
          <NoCards />
        </>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    // cards: state.activities.activities,
  }),
  {},
)(MainPage);
