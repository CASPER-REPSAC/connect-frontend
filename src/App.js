import './App.css';
import { Route } from 'react-router-dom';
import CardDetailPage from './pages/CardDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import ActivityPage from './pages/ActivityPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <Route component={MainPage} path={['/@:username', '/']} exact />
      <Route component={ActivityPage} path={'/activities'} />
      <Route component={LoginPage} path={'/login'} />
      <Route component={RegisterPage} path={'/register'} />
      <Route component={WritePage} path={'/write'} />
      <Route component={CardDetailPage} path={'/@:username/:cardId'} />
    </>
  );
}

export default App;
