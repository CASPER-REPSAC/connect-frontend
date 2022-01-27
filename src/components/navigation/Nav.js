// import modules
import { NavLink } from 'react-router-dom';
import React from 'react';

import DropdownMenu from '../common/DropdownMenu';
import Searchbar from '../common/Searchbar';

import casLogo from '../../img/cas-40.png';
import '../../styles/Nav.scss';
import GoogleButton from '../auth/GoogleButton';
import LogoutButton from '../auth/LogoutButton';
import { Button } from '../common/Button';

import { useSelector } from 'react-redux';

const Nav = () => {
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  const { email, pk } = user;
  return (
    <div className="nav">
      <NavLink to="/" className="nav-link-logo">
        <img
          src={casLogo}
          alt="Logo"
          className="logo-tablet less-then-tablet-show"
        />
      </NavLink>
      <DropdownMenu menuName="HOME" menuLink="/"></DropdownMenu>
      <DropdownMenu menuName="ACTIVITY" menuLink="/activities">
        <li>
          <NavLink to="/types/Running">Running</NavLink>
        </li>
        <li>
          <NavLink to="/types/Planned">Planned</NavLink>
        </li>
        <li>
          <NavLink to="/types/Ended">Ended</NavLink>
        </li>
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
      <div className="d-flex justify-content-center align-items-center m-1">
        <Button
          onClick={() => {
            window.open('https://github.com/CASPER-REPSAC/casper-api/issues');
          }}
          background="#8B0000"
        >
          제보&제안
        </Button>
      </div>
      {!email && !pk ? (
        <div className="justify-content-center align-items-center less-then-tablet-show ">
          <GoogleButton />
        </div>
      ) : (
        <>
          <div className="justify-content-center align-items-center less-then-tablet-show ">
            <LogoutButton />
          </div>
        </>
      )}

      <Searchbar />
    </div>
  );
};

export default React.memo(Nav);
