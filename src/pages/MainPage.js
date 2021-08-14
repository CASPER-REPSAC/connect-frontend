import React from 'react';
import Button from '../components/common/Button';
import { connect } from 'react-redux';
import RecentBox from '../components/common/RecentBox';

import '../styles/MainPage.scss';

const MainPage = ({ cards }) => {
  return (
    <div className="main-page">
      <RecentBox cards={cards} />
    </div>
  );
};

export default connect(
  (state) => ({
    cards: state.activities.activities,
  }),
  {},
)(MainPage);
