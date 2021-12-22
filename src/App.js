import React, { useEffect } from 'react';
import './App.scss';

// import Pages
import ActivityDetailPage from './pages/ActivityDetailPage';
import ActivityChapterPage from './pages/ActivityChapterPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import ActivityPage from './pages/ActivityPage';
import MainPage from './pages/MainPage';
import TagPage from './pages/TagPage';
import UserPage from './pages/UserPage';

// import Basic Components
import MainContainer from './containers/MainContainer';
import Nav from './components/navigation/Nav';
import Sidebar from './components/navigation/Sidebar';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from './modules/auth';
import { Cookies } from 'react-cookie';
import jwt from 'jwt-decode';
const cookies = new Cookies();

const reqTest = async () => {
  const res = await axios.get('/api/test/');
  console.log('get', res);
  const res2 = await axios.post('/api/test/');
  console.log('post', res2);
};

function App() {
  const dispatch = useDispatch();
  const onLoginSuccess = (userData) => dispatch(loginSuccess(userData));
  const onLogout = () => dispatch(logout());

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem('user');
    const cookieAccessToken = cookies.get('access_token');
    const cookieRefreshToken = cookies.get('refresh_token');

    if (localStorageUser && cookieAccessToken) {
      const accessTokenExp = jwt(cookieAccessToken).exp;

      const isExp = new Date(accessTokenExp * 1000) < new Date();
      if (isExp) {
        window.localStorage.removeItem('user');
        onLogout();
      } else {
        onLoginSuccess({
          ...JSON.parse(localStorageUser),
          access_token: cookieAccessToken,
          refresh_token: cookieRefreshToken,
        });
      }
    } else {
      cookies.remove('access_token');
      window.localStorage.removeItem('user');
    }
  }, []);

  return (
    <div className="app-container">
      <button onClick={() => reqTest()}>req test</button>
      <div className="app-box">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="nav-main-container">
          <Nav />
          <MainContainer
            ActivityDetailPage={ActivityDetailPage}
            ActivityChapterPage={ActivityChapterPage}
            LoginPage={LoginPage}
            RegisterPage={RegisterPage}
            WritePage={WritePage}
            ActivityPage={ActivityPage}
            MainPage={MainPage}
            TagPage={TagPage}
            UserPage={UserPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
