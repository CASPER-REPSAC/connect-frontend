// import modules
import { NavLink } from 'react-router-dom';
import React from 'react';

import DropdownMenu from '../common/DropdownMenu';
import Searchbar from '../common/Searchbar';

import casLogo from '../../img/cas-40.png';
import '../../styles/Nav.scss';

const Nav = () => {
  return (
    <div className="nav">
      <NavLink to="/" className="nav-link-logo">
        <img src={casLogo} alt="Logo" className="logo-tablet" />
      </NavLink>
      <DropdownMenu menuName="HOME" menuLink="/"></DropdownMenu>
      <DropdownMenu menuName="ACTIVITY" menuLink="/activities">
        <li>
          <NavLink to="/activities/study">study</NavLink>
        </li>
        <li>
          <NavLink to="/activities/project">project</NavLink>
        </li>
        <li>
          <NavLink to="/activities/ctf">ctf</NavLink>
        </li>
      </DropdownMenu>
      <DropdownMenu menuName="WRITE" menuLink="/write"></DropdownMenu>
      <Searchbar />
    </div>
  );
};

export default React.memo(Nav);
