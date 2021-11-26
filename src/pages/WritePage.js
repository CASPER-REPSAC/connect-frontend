import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WriteActivity from '../components/write/WriteActivity';
import '../styles/Write.scss';

const WritePage = () => {
  return (
    <>
      <Route exact component={WriteActivity} path={'/write'} />
    </>
  );
};

export default React.memo(WritePage);
