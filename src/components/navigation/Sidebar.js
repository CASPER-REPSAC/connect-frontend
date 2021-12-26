import React, { useState, useEffect } from 'react';
import SidebarTodos from './SidebarTodos';

import MiniProfile from '../profile/MiniProfile';

import { getUserContainedList } from '../../modules/api';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setContainedActivities } from '../../modules/activities';

import casLogo from '../../img/cas.png';
import '../../styles/Sidebar.scss';

const Sidebar = () => {
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  const { containedActivities } = useSelector((state) => ({
    containedActivities: state.activities.containedActivities,
  }));

  const dispatch = useDispatch();
  const getContainedActivities = (activities) => {
    dispatch(setContainedActivities(activities));
  };

  useEffect(() => {
    if (user.access_token) {
      getUserContainedList(user.access_token, getContainedActivities);
    }
  }, [user]);

  return (
    <div className="sidebar">
      <NavLink to="/" className="d-block">
        <img src={casLogo} alt="Logo" className="logo-sidebar" />
      </NavLink>
      {/* <GoogleButton /> */}
      <MiniProfile user={user} />
      {user.pk && containedActivities && Array.isArray(containedActivities) && (
        <SidebarTodos
          userContainedActivity={containedActivities.filter(
            (acti) => acti.currentState !== 2,
          )}
        />
      )}
    </div>
  );
};

export default Sidebar;
