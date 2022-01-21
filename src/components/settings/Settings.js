import React from "react";
import { Modal } from "#comp/common";

export const SettingsModal = ({ show, setShow }) => {
  return (
    <Modal show={show} setShow={setShow}>
      <div>
        <div>Settings</div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
