import React from "react";
import { Modal } from "#comp/common";

export const SettingsModal = ({ show, setShow }) => {
  return (
    <Modal show={show} setShow={setShow}>
      <div className="w-[500px] h-[400px]">
        <div>다크 모드 추가 예정</div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
