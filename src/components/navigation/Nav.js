// import modules
import { Link } from 'react-router-dom';
import React from 'react';
import DropdownMenu from '../common/DropdownMenu';
import Searchbar from '../common/Searchbar';
import '../../styles/Nav.scss';

const Nav = () => {
  return (
    <div className="nav">
      <DropdownMenu menuName="HOME" menuLink="/" />
      <DropdownMenu menuName="ACTIVITY" menuLink="/activities">
        <li>
          <Link to="/activities/study">study</Link>
        </li>
        <li>
          <Link to="/activities/project">project</Link>
        </li>
        <li>
          <Link to="/activities/ctf">ctf</Link>
        </li>
      </DropdownMenu>
      <Searchbar />
    </div>
  );
};

export default React.memo(Nav);
