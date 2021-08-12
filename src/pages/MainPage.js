import React from 'react';
import Button from '../components/common/Button';

const MainPage = () => {
  return (
    <div>
      Main
      <Button>하이</Button>
    </div>
  );
};

export default React.memo(MainPage);
