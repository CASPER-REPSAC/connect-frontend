import React from 'react';
import GoogleButton from '../components/auth/GoogleButton';
import Button from '../components/common/Button';

const MainPage = () => {
  return (
    <div>
      Main
      <GoogleButton />
      <Button>하이</Button>
    </div>
  );
};

export default React.memo(MainPage);
