import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WriteActivity from '../components/write/WriteActivity';
import UpdateActivity from '../components/write/UpdateActivity';

import WriteChapter from '../components/write/WriteChapter';
import UpdateChapter from '../components/write/UpdateChapter';
import '../styles/Write.scss';

const WritePage = () => {
  return (
    <>
      <Switch>
        <Route exact component={WriteActivity} path={'/write'} />

        <Route
          exact
          component={UpdateActivity}
          path={'/write/activities/:activityId/update'}
        />

        <Route
          exact
          component={WriteChapter}
          path={'/write/activities/:activityId'}
        />
        <Route
          exact
          component={UpdateChapter}
          path={'/write/activities/:activityId/chapter/:chapterId/update'}
        />
      </Switch>
    </>
  );
};

export default React.memo(WritePage);
