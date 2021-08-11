import React from 'react';
import CardListContainer from '../containers/CardListContainer';

const ActivityPage = ({ history }) => {
  console.log(history);
  return (
    <div>
      card list
      <CardListContainer />
    </div>
  );
};

export default React.memo(ActivityPage);
