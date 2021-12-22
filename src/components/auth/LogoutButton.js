import React from 'react';
import '../../styles/Profile.scss';
import { useDispatch } from 'react-redux';
import Button from '../common/Button';
import { logout } from '../../modules/auth';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function LogoutButton() {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logout());
  const onClick = () => {
    cookies.remove('access_token');
    window.localStorage.removeItem('user');
    onLogout();
  };
  return (
    <>
      <Button width="100%" onClick={() => onClick()}>
        로그아웃
      </Button>
    </>
  );
}

export default LogoutButton;
