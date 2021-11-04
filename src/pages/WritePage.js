import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import WriteActivity from '../components/write/WriteActivity';
import WriteChapters from '../components/write/WriteChapters';
import '../styles/Write.scss';

const WritePage = () => {
  return (
    <>
      <Switch>
        <Route exact component={WriteActivity} path={'/write'} />
        <Route exact component={WriteChapters} path={'/write/:id'} />
      </Switch>
    </>
  );
};

export default React.memo(WritePage);
