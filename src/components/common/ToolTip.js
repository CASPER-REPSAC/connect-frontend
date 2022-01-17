import React from "react";
import styled from "styled-components";

export const ToolTipContainer = styled.div`
  position: relative;
  span {
    opacity: 0;
    transform: scale(0, 0) rotate(20deg);
    transition: 100ms ease-in-out;
  }
  &:hover {
    span {
      opacity: 100;
      transform: scale(1, 1) rotate(0);
    }
  }
`;

export const WithToolTip = (props) => {
  return (
    <ToolTipContainer
      {...props}
      className={`relative last:opacity-0 hover:last:opacity-100 ${
        props.className || ""
      }`}
    >
      {props.children}
      <span
        className={`
        p-1 w-24 bg-background-700 border-none 
        text-center rounded-md absolute top-16
        -left-1/4 text-sm z-10 
      after:absolute after:-top-1/4 after:right-1/2 after:border-transparent
      after:border-b-background-700 after:border-4`}
      >
        {props.tooltip}
      </span>
    </ToolTipContainer>
  );
};

export default WithToolTip;
