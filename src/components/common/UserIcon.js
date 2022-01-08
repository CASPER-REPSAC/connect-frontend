import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

const StyledUserIcon = styled.img`
  text-align: center;
  line-height: 55px;
  font-weight: bold;
  font-size: 30px;
  color: white;

  flex: none;
  height: 3.6rem;
  width: 3.6rem;
  background: lightgray;
  margin: 8px 12px 5px 0px;
  border-radius: 0.6rem;

  ${(props) =>
    css`
      width: ${props.width};
      height: ${props.height};
      color: ${props.color};
      background: ${props.background};
      border-radius: ${props.borderRadius};
      font-size: ${props.fontSize};
      margin: ${props.margin};
      border: ${props.border};
      line-height: ${props.height};
    `}
`;

// props.children도 함께 상속됨.
export const UserIcon = (props, url) => {
  return (
    <Link to={`/users/${props.user}`} title={props.user}>
      <StyledUserIcon {...props} />
    </Link>
  );
};

export default UserIcon;
