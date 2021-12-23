import React from 'react';
import casGray from '../../img/casOutlineDark-40.png';

const NoCards = ({ msg }) => {
  return (
    <div className="d-flex align-items-center">
      <img src={casGray} alt="cas logo" />
      <small className="m-1 text-muted" style={{ fontSize: '12px' }}>
        {msg || <>현재 보여줄 수 있는 카드가 없네요..</>}
      </small>
    </div>
  );
};

export { NoCards };
