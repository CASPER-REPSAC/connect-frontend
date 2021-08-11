// import modules
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// import Pages
import ActivityDetailPage from './pages/ActivityDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import ActivityPage from './pages/ActivityPage';
import MainPage from './pages/MainPage';

// import Nav, Footer
import Nav from './components/navigation/Nav';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>

          <Route path="/main">
            <Nav />
            <Route exact component={MainPage} path="/main" />
          </Route>

          <Route path={'/activities'}>
            <Nav />
            <Route exact component={ActivityPage} path={'/activities'} />
            <Route
              exact
              component={ActivityDetailPage}
              path={'/activities/:category/:id'}
            />
          </Route>

          <Route exact component={LoginPage} path={'/login'} />
          <Route exact component={RegisterPage} path={'/register'} />
          <Route exact component={WritePage} path={'/write'} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
