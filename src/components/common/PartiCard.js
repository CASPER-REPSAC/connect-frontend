import React from 'react';
import '../../styles/Write.scss';

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
