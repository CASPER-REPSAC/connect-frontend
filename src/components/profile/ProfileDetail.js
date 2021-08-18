import React from 'react';
import '../../styles/Profile.scss';

function ProfileDetail({ icon, name, badge, introduce }) {
  return (
    <div className="mini-profile">
      <div className="profile">
        <div className="icon">{icon ? icon : 'no icon'}</div>
        <div className="right">
          <div className="name">{name ? name : 'no name'}</div>
          <div className="badge">{badge ? badge : 'no badge'}</div>
        </div>
      </div>
      <div className="introduce">{introduce ? introduce : 'no introduce'}</div>
      <div className="arrow-down">▼</div>
    </div>
  );
}

export default ProfileDetail;
