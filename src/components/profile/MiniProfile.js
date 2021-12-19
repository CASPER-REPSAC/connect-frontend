import React from 'react';
import '../../styles/Profile.scss';
import LoginButton from '../auth/LoginButton';
import GoogleButton from '../auth/GoogleButton';

function MiniProfile({ user, icon, name, badge, introduce }) {
  return (
    <>
      {user ? (
        <>
          <div className="conn-mini-profile">
            <div className="profile">
              <div className="icon">{icon ? icon : 'no icon'}</div>
              <div className="right">
                <div className="name">{name ? name : 'no name'}</div>
                <div className="badge">{badge ? badge : 'no badge'}</div>
              </div>
            </div>
            <div className="introduce">
              {introduce ? introduce : 'no introduce'}
            </div>
            <div className="arrow-down">▼</div>
          </div>
        </>
      ) : (
        <>
          <div className="conn-mini-profile justify-content-center align-items-center p-3">
            <small className="m-1 text-muted text-center">
              유저 데이터가 없습니다. <br /> 로그인 해주세요.
            </small>
            <GoogleButton />
          </div>
        </>
      )}
    </>
  );
}

export default MiniProfile;
