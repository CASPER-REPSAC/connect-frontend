import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecentBox from '../components/common/RecentBox';
import CardList from '../components/card/CardList';
import { getListData } from '../modules/api';
import axios from 'axios';

// import '../styles/MainPage.scss';

const MainPage = () => {
  const [cards, setCards] = useState();
  useEffect(() => {
    getListData('/api/activities/', setCards);
  }, []);

  const [tags, setTags] = useState([]);

  return (
    <div className="main-page">
      {console.log('cards', cards)}
      {cards && cards[0] && (
        <>
          <RecentBox cards={cards} />
          <br />
          <h3>Currently Running</h3>
          <CardList
            n={true}
            cards={cards.filter((card) => card.currentState === 1).slice(2, 4)}
          />
          <br />
          <h3>Ended</h3>
          <CardList
            n={true}
            cards={cards
              .filter((card) => card.currentState === 0)
              .slice(15, 20)}
          />
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
