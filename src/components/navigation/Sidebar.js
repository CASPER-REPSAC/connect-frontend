import React, { useState, useEffect } from 'react';
import SidebarTodos from './SidebarTodos';

import MiniProfile from '../profile/MiniProfile';
import GoogleButton from '../auth/GoogleButton';

import { getUserContainedList } from '../../modules/api';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import casLogo from '../../img/cas.png';
import '../../styles/Sidebar.scss';

const Sidebar = () => {
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  const [userContainedActivity, setUserContainedActivity] = useState();

  useEffect(() => {
    if (user.access_token) {
      getUserContainedList(user.access_token, setUserContainedActivity);
    }
  }, [user]);

  return (
    <div className="sidebar">
      <NavLink to="/" className="d-block">
        <img src={casLogo} alt="Logo" className="logo-sidebar" />
      </NavLink>
      {/* <GoogleButton /> */}
      <MiniProfile user={user} />
      {user.pk && (
        <SidebarTodos userContainedActivity={userContainedActivity} />
      )}
    </div>
  );
};

export default Sidebar;
