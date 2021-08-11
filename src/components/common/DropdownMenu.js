import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';

const DropdownMenu = ({ children, menuName, menuLink }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="menu-container"
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(false)}
    >
      <Link className="menu-trigger" to={menuLink}>
        <span>{menuName}</span>
      </Link>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? 'active' : 'inactive'}`}
      >
        <ul>{children}</ul>
      </nav>
    </div>
  );
};

export default React.memo(DropdownMenu);
