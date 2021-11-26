import React from 'react';
import '../../styles/Profile.scss';
import Button from '../common/Button';
import axios from 'axios';

function MiniProfile({ user, icon, name, badge, introduce }) {
  const onClickHandler = async () => {
    console.log('hi');
    // let data, header;
    // await axios.post('/api/auth/google/', data,{{header:header}})
  };
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
            <Button
              className="d-block"
              width="100%"
              onClick={() => {
                onClickHandler();
              }}
            >
              로그인
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default MiniProfile;
