import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WriteActivity from '../components/write/WriteActivity';
import WriteChapter from '../components/write/WriteChapter';
import '../styles/Write.scss';

const WritePage = () => {
  return (
    <>
    <Switch>
      <Route exact component={WriteActivity} path={'/write'} />
      <Route exact component={WriteChapter} path={'/write/activities/:activityId'} />
    </Switch>
    </>
  );
};

export default React.memo(WritePage);
