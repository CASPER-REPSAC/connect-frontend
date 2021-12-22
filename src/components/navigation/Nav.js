// import modules
import { NavLink } from 'react-router-dom';
import React from 'react';

import DropdownMenu from '../common/DropdownMenu';
import Searchbar from '../common/Searchbar';

import casLogo from '../../img/cas-40.png';
import '../../styles/Nav.scss';
import GoogleButton from '../auth/GoogleButton';

import { useSelector } from 'react-redux';

const Nav = () => {
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  const { email, pk } = user;
  return (
    <div className="nav">
      <NavLink to="/" className="nav-link-logo">
        <img src={casLogo} alt="Logo" className="logo-tablet" />
      </NavLink>
      <DropdownMenu menuName="HOME" menuLink="/"></DropdownMenu>
      <DropdownMenu menuName="ACTIVITY" menuLink="/activities">
        <li>
          <NavLink to="/types/Study">Study</NavLink>
        </li>
        <li>
          <NavLink to="/types/Project">Project</NavLink>
        </li>
        <li>
          <NavLink to="/types/CTF">CTF</NavLink>
        </li>
      </DropdownMenu>
      <DropdownMenu menuName="WRITE" menuLink="/write"></DropdownMenu>
      {!email && !pk && 'access_token' && <GoogleButton />}

      <Searchbar />
    </div>
  );
};

export default React.memo(Nav);
