import React from 'react';
import '../../styles/Write.scss';
import { Link } from 'react-router-dom';

export const PartiCard = (props) => {
  return (
    <div
      {...props}
      className="participant-card active w-100"
      style={{ fontSize: '12px' }}
    >
      <>{props.children}</>
    </div>
  );
};

export const PartiIcon = (props) => {
  return (
    <img
      src={props.img}
      alt={`participant icon : ${props.partiName}`}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '7px',
        margin: '1.5px',
      }}
    />
  );
};
export const UserIcon = (props) => {
  return (
    <img
      src={props.img}
      alt={`author icon : ${props.userName}`}
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '9px',
        margin: '5px 8px 5px -5px',
      }}
    />
  );
};

export const LinkedCard = (props) => {
  return (
    <PartiCard {...props}>
      <Link to={props.link || 'main'}>
        <b>{props.children || 'title'}</b>
      </Link>
    </PartiCard>
  );
};

export const ChapterCard = (props) => {
  return (
    <PartiCard {...props}>
      <Link to={props.link || 'main'}>
        <b>{props.children || 'title'}</b>
      </Link>
    </PartiCard>
  );
};
