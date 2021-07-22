import React from 'react';
import CardListContainer from '../containers/CardListContainer';

const CardListPage = () => {
  return (
    <div>
      card list
      <CardListContainer />
    </div>
  );
};

export default React.memo(CardListPage);
