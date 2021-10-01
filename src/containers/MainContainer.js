import { Switch, Route, Redirect } from 'react-router-dom';
import '../styles/MainContainer.scss';

const MainContainer = ({
  MainPage,
  ActivityPage,
  ActivityDetailPage,
  LoginPage,
  RegisterPage,
  WritePage,
}) => {
  return (
    <div className="main">
      <div className="main-container">
        {' '}
        <Switch>
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>

          <Route path="/main">
            <Route exact component={MainPage} path="/main" />
          </Route>

          <Route path={'/activities'}>
            <Route exact component={ActivityPage} path={'/activities'} />
            <Route
              exact
              component={ActivityPage}
              path={'/activities/:category'}
            />
            <Route
              exact
              component={ActivityDetailPage}
              path={'/activities/:category/:id'}
            />
          </Route>

          <Route exact component={LoginPage} path={'/login'} />
          <Route exact component={RegisterPage} path={'/register'} />
          <Route component={WritePage} path={'/write'} />
        </Switch>
      </div>
    </div>
  );
};

export default MainContainer;
