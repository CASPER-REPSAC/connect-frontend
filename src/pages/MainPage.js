import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecentBox from '../components/common/RecentBox';
import CardList from '../components/card/CardList';
import { getListData } from '../modules/api';
import axios from 'axios';

import '../styles/MainPage.scss';

const MainPage = ({ cards }) => {
  useEffect(() => {
    async function getActivites() {
      const res2 = await axios.get('http://localhost:8000/api/');
      console.log(res2);
    }
    getActivites();
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
    cards: state.activities.activities,
  }),
  {},
)(MainPage);
