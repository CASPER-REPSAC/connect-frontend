import React from "react";

export const Modal = ({ children, show, setShow }) => {
  let className =
    "fixed  h-screen top-0 left-0 w-screen flex justify-center items-center z-50";
  if (!show) {
    className = className + " scale-0";
  }
  let bgClassName =
    "absolute top-0 left-0 h-screen w-screen opacity-30 bg-background-500 transition-opacity ";
  if (!show) {
    bgClassName = bgClassName + " opacity-0";
  }
  let modalClassName =
    "z-20 h-fit w-fit p-4 bg-background-50 shadow-xl rounded-xl transition-transform";
  if (!show) {
    modalClassName = modalClassName + " scale-0";
  }

  return (
    <div className={className}>
      <div className={modalClassName}>
        <div onClick={() => setShow(false)}>❌</div>
        <div>{children}</div>
      </div>
      <div className={bgClassName}></div>
    </div>
  );
};
