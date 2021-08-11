import React, { useRef, useState, useEffect } from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({ children }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="menu-container"
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(false)}
    >
      <button className="menu-trigger">
        <span>DropDown</span>
      </button>
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
