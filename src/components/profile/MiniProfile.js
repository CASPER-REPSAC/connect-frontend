import React from 'react';
import '../../styles/Profile.scss';

import GoogleButton from '../auth/GoogleButton';
import LogoutButton from '../auth/LogoutButton';
import { UserIcon } from '../common/PartiCard';

function MiniProfile({ user }) {
  const { icon, first_name, last_name, email, pk } = user;
  return (
    <>
      {email && pk ? (
        <>
          <div className="conn-mini-profile">
            <div className="profile">
              {/* <div className="icon text-center">
                {email ? email.substring(0, 1) : 'A'}
              </div> */}
              <UserIcon userName={`${last_name}${first_name}`} noTooltip />
              <div className=" m-2 right">
                <div className="name">
                  {last_name ? last_name : 'no name'}
                  {first_name ? first_name : 'no name'}
                </div>
              </div>
            </div>
            <div className="introduce">{email ? email : 'no introduce'}</div>

            <div className="justify-content-center align-items-center p-3">
              <LogoutButton />
            </div>
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
