import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WriteActivity from '../components/write/WriteActivity';
import UpdateActivityContainer from '../components/write/UpdateActivityContainer';

import { useSelector } from 'react-redux';
import WriteChapter from '../components/write/WriteChapter';
import UpdateChapter from '../components/write/UpdateChapter';
import '../styles/Write.scss';
import { NoCards } from '../components/common/NoCards';

const WritePage = () => {
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  return (
    <>
      {!user.access_token ? (
        <NoCards msg="로그인 해주세요." />
      ) : (
        <Switch>
          <Route exact component={WriteActivity} path={'/write'} />

          {/* <Route
            exact
            component={UpdateActivityContainer}
            path={'/write/activities/:activityId/update'}
          /> */}

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
      )}
    </>
  );
};

export default React.memo(WritePage);
