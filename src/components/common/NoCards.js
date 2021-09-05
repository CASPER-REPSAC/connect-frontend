import React from 'react';
import casGray from '../../img/casOutlineDark-40.png';
import styled from 'styled-components';

// .no-card {
//   display: flex;
//   align-items: center;
//   img {
//     margin-right: 10px;
//   }
// }

const NoCardDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
`;

const NoCardSpan = styled.span`
  margin-left: 10px;
`;

const NoCards = () => {
  return (
    <NoCardDiv>
      <img src={casGray} alt="cas logo" />
      <NoCardSpan>현재 보여줄 수 있는 카드가 없네요..</NoCardSpan>
    </NoCardDiv>
  );
};

export { NoCards };
