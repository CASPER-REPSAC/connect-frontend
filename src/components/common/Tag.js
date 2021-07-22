import React from 'react';
import styled, { css } from 'styled-components';

const StyledTag = styled.div`
  font-size: 0.7rem;
  color: white;
  display: inline-block;
  padding: 0.1rem 0.6rem 0.2rem 0.6rem;
  border-radius: 1rem;

  & + & {
    margin-left: 0.3rem;
  }

  background: gray;

  ${(props) => {
    const { tagColor } = props;
    return css`
      background: ${tagColor};
    `;
  }}

  ${(props) => {
    const { currentState } = props;
    switch (currentState) {
      case 'running':
        return css`
          background: darkorange;
        `;
      case 'finished':
        return css`
          background: gray;
        `;
      default:
        return 0;
    }
  }}
`;

const Tag = (props) => {
  return <StyledTag {...props} />;
};

export default Tag;
