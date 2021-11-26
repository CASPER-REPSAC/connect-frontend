import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: #27242c;
  &:hover {
    filter: brightness(80%);
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
const Button = (props) => {
  return <StyledButton {...props} />;
};

export default React.memo(Button);
