import React from 'react';
import '../../styles/Write.scss';
import { Link } from 'react-router-dom';

export const PartiCard = (props) => {
  return (
    <div
      {...props}
      className="participant-card active"
      style={{ fontSize: '12px' }}
    >
      <>{props.children}</>
    </div>
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
