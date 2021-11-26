import React from 'react';
import casGray from '../../img/casOutlineDark-40.png';

const NoCards = () => {
  return (
    <div className="d-flex align-items-center">
      <img src={casGray} alt="cas logo" />
      <small className="m-1 text-muted">
        현재 보여줄 수 있는 카드가 없네요.. <br /> 인터넷 연결이나 서버의 문제일
        수 있어요.
      </small>
    </div>
  );
};

export { NoCards };
