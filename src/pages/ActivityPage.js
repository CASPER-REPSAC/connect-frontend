import React from 'react';
import CardListContainer from '../containers/CardListContainer';

const ActivityPage = () => {
  return (
    <div>
      card list
      <CardListContainer />
    </div>
  );
};

export default React.memo(ActivityPage);
