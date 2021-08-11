// import modules
import { Link } from 'react-router-dom';
import React from 'react';
import DropdownMenu from '../common/DropdownMenu';

const Nav = () => {
  return (
    <div>
      <DropdownMenu>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/activities">activity</Link>
        </li>
      </DropdownMenu>
    </div>
  );
};

export default React.memo(Nav);
