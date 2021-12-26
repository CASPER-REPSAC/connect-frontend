import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

const StyledUserIcon = styled.div`
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
  const { userColors } = useSelector((state) => ({
    userColors: state.colors.userColors,
  }));

  let tmpUserPk = 0;
  for (let i = 0; i < props.user.length; i++) {
    tmpUserPk += props.user.charCodeAt(i);
  }

  const colorIndex = tmpUserPk % userColors.length;

  return (
    <Link to={`/users/${props.user}`} title={props.user}>
      <StyledUserIcon {...props} background={userColors[colorIndex]}>
        {props.user.substr(0, 1)}
      </StyledUserIcon>
    </Link>
  );
};

export default UserIcon;
