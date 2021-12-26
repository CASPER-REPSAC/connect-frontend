import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const StyledBadge = styled.div`
  border: none;
  border-radius: 10px;
  font-weight: 600;
  padding: 1px 10px;
  color: white;
  cursor: pointer;
  width: fit-content;

  background: rgb(86, 101, 107);
  a:hover {
    color: white;
  }
  .icon {
    transition: 100ms ease-in-out;
    font-size: 12px;
    * {
      color: white;
    }
  }
  &:hover {
    .icon {
      transform: translate(3px);
    }
  }

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
    `}
`;

// props.children도 함께 상속됨.
export const RoundBadge = (props) => {
  return (
    <StyledBadge {...props}>
      {props.children}{' '}
      <FontAwesomeIcon icon={faChevronRight} className="icon" />
    </StyledBadge>
  );
};

export default React.memo(RoundBadge);
