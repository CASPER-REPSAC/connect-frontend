import SidebarProfile from './SidebarProfile';
import SidebarMenu from './SidebarMenu';

import { Link } from 'react-router-dom';

import casLogo from '../../img/cas.png';
import '../../styles/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={casLogo} alt="Logo" className="logo-sidebar" />
      </Link>
      <SidebarProfile />
      <SidebarMenu></SidebarMenu>
    </div>
  );
};

export default Sidebar;
