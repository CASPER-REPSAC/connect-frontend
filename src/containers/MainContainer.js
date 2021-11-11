import { Switch, Route, Redirect } from 'react-router-dom';
import '../styles/MainContainer.scss';

const MainContainer = ({
  MainPage,
  ActivityPage,
  ActivityDetailPage,
  ActivityChapterPage,
  LoginPage,
  RegisterPage,
  WritePage,
  UserPage,
  TagPage,
}) => {
  return (
    <div className="main">
      <div className="main-container">
        <Switch>
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>

          <Route path="/main">
            <Route exact component={MainPage} path="/main" />
          </Route>

          <Route path={'/types'}>
            <Route exact component={ActivityPage} path={'/types/:type'} />
          </Route>

          <Route path={'/activities'}>
            <Route exact component={ActivityPage} path={'/activities'} />
            <Route
              exact
              component={ActivityDetailPage}
              path={'/activities/:activityId'}
            />
            <Route
              exact
              component={ActivityChapterPage}
              path={'/activities/:activityId/chapter/:chapterId'}
            />
          </Route>
          <Route exact component={UserPage} path={'/users/:userId'} />
          <Route exact component={TagPage} path={'/tags/:tagId'} />

          <Route exact component={LoginPage} path={'/login'} />
          <Route exact component={RegisterPage} path={'/register'} />
          <Route component={WritePage} path={'/write'} />
        </Switch>
      </div>
    </div>
  );
};

export default MainContainer;
