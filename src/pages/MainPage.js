import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecentBox from '../components/common/RecentBox';
import CardList from '../components/card/CardList';
import { getListData } from '../modules/api';
import axios from 'axios';

import '../styles/MainPage.scss';

const MainPage = () => {
  const [cards, setCards] = useState();
  useEffect(() => {
    getListData('/api/', setCards);
  }, []);

  return (
    <div className="main-page">
      <RecentBox cards={cards} />
      <CardList n={true} />
    </div>
  );
};

export default connect(
  (state) => ({
    // cards: state.activities.activities,
  }),
  {},
)(MainPage);
