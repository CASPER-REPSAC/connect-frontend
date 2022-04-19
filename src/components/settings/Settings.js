import React from "react";
import { Modal } from "#comp/common";
import { useClientThemes } from "@/hooks";

const ColorCheckBox = ({ color }) => {
  const { setClientPointColor } = useClientThemes();
  return (
    <button
      style={{ display: "block", color: color }}
      onClick={() => {
        setClientPointColor("point-" + color);
      }}
    >
      {color}
    </button>
  );
};

export const SettingsModal = ({ show, setShow }) => {
  return (
    <Modal show={show} setShow={setShow}>
      <div className="w-[500px] h-[400px] text-text-800">
        <h4>테마 기능 추가중 입니다..</h4>
        <ColorCheckBox color="orange" />
        <ColorCheckBox color="cyan" />
        <ColorCheckBox color="lime" />
        <ColorCheckBox color="blue" />
      </div>
    </Modal>
  );
};

export default SettingsModal;
