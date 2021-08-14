import React from 'react';
import CardListContainer from '../containers/CardListContainer';

const ActivityPage = ({ history }) => {
  console.log(history);
  return (
    <div>
      activity page
      <br />
      card list
      <CardListContainer />
    </div>
  );
};

export default React.memo(ActivityPage);
