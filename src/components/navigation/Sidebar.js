import React, { useState, useEffect } from 'react';
import SidebarTodos from './SidebarTodos';

import MiniProfile from '../profile/MiniProfile';
import GoogleButton from '../auth/GoogleButton';

import { NavLink } from 'react-router-dom';

import casLogo from '../../img/cas.png';
import '../../styles/Sidebar.scss';

import { Cookies } from 'react-cookie';
import jwt from 'jwt-decode';
const cookies = new Cookies();

const Sidebar = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    if (cookies.get('access_token')) {
      const token = cookies.get('access_token');
      const user = jwt(token);
      console.log(user);
      setUser(1);
    }
  }, []);

  return (
    <div className="sidebar">
      <NavLink to="/" className="d-block">
        <img src={casLogo} alt="Logo" className="logo-sidebar" />
      </NavLink>
      {/* <GoogleButton /> */}
      <MiniProfile user={user} />
      {/* <SidebarTodos /> */}
    </div>
  );
};

export default Sidebar;
