import React, { useState, useEffect } from 'react';
import SidebarTodos from './SidebarTodos';

import MiniProfile from '../profile/MiniProfile';
import GoogleButton from '../auth/GoogleButton';

import { NavLink } from 'react-router-dom';

import casLogo from '../../img/cas.png';
import '../../styles/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" className="d-block">
        <img src={casLogo} alt="Logo" className="logo-sidebar" />
      </NavLink>
      {/* <GoogleButton /> */}
      <MiniProfile />
      {/* <SidebarTodos /> */}
    </div>
  );
};

export default Sidebar;
