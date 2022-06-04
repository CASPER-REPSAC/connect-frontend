import React from "react";
import { Modal, Muted } from "#comp/common";
import { useClientThemes } from "@/hooks";
import { ThemeButton } from "#comp/common/Buttons";
import { themesTitles } from "#text";

const ColorButton = ({ color }) => {
  const { setClientPointColor } = useClientThemes();
  return (
    <button
      className="w-5 h-5 m-1 rounded active:rounded-lg transition-all"
      style={{ display: "block", background: color }}
      onClick={() => {
        setClientPointColor("point-" + color);
      }}
    />
  );
};

const ColorSamples = () => {
  return (
    <div>
      <span className="bg-point-50 w-3 h-3 transition-all inline-block rounded m-[1px]" />
      <span className="bg-point-100 w-3 h-3 transition-all inline-block rounded m-[1px]" />
      <span className="bg-point-200 w-3 h-3 transition-all inline-block rounded m-[1px]" />
      <span className="bg-point-300 w-3 h-3 transition-all inline-block rounded m-[1px]" />
      <span className="bg-point-400 w-3 h-3 transition-all inline-block rounded m-[1px]" />
      <span className="bg-point-500 w-3 h-3 transition-all inline-block rounded m-[1px]" />
      <span className="bg-point-600 w-3 h-3 transition-all inline-block rounded m-[1px]" />
      <span className="bg-point-700 w-3 h-3 transition-all inline-block rounded m-[1px]" />
      <span className="bg-point-800 w-3 h-3 transition-all inline-block rounded m-[1px]" />
      <span className="bg-point-900 w-3 h-3 transition-all inline-block rounded m-[1px]" />
    </div>
  );
};

const ColorSettingContainer = ({ colorList }) => {
  return (
    <div>
      <h4 className="mt-2">{themesTitles.setPointColor}</h4>
      <div className="flex items-center gap-x-2">
        <div className="flex bg-gray-200 rounded w-fit">
          {colorList && colorList.map((color) => <ColorButton color={color} />)}
        </div>
        <ColorSamples />
        <Muted>{themesTitles.settedColor}</Muted>
      </div>
      <Muted>{themesTitles.setPointColorInfo}</Muted>
    </div>
  );
};

const DarkModeSettingContainer = () => {
  return (
    <div>
      <h4 className="mt-2">{themesTitles.darkmode}</h4>
      <ThemeButton />
    </div>
  );
};

export const SettingsModal = ({ show, setShow }) => {
  return (
    <Modal show={show} setShow={setShow}>
      <div className="w-[500px] h-[400px] text-text-800">
        <DarkModeSettingContainer />
        <ColorSettingContainer colorList={["orange", "cyan", "lime", "blue"]} />
      </div>
    </Modal>
  );
};

export default SettingsModal;
