import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleChapterList } from "@/redux/shows";
import { useLocation } from "react-router-dom";
import { ArrowLeftSVG } from "@/icons";
import { ThemeButton } from "#comp/common/Buttons";

const ToggleActivityInfoButton = ({
  onActivityInfoToggle,
  chapterListShow,
}) => {
  return (
    <button
      onClick={() => {
        onActivityInfoToggle();
      }}
      className="h-full flex items-center group absolute text-text-900"
    >
      <div
        className={
          "mx-2 transition-all " + (chapterListShow ? "" : "rotate-180")
        }
      >
        <ArrowLeftSVG />
      </div>
      <div className=" group-hover:translate-x-1 transition-all text-text-700 text-sm font-bold pt-1">
        액티비티 정보
      </div>
    </button>
  );
};

const TopNavHeader = ({ location }) => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <h4>{location.pathname}</h4>
    </div>
  );
};

export const TopNavBar = () => {
  const dispatch = useDispatch();
  const chapterListShow = useSelector((state) => state.shows.chapterList.show);
  const location = useLocation();
  const onActivityInfoToggle = () => {
    dispatch(toggleChapterList());
  };

  return (
    <nav className="bg-background-50 h-9 relative">
      <div className="absolute left-0 top-0 h-full w-full">
        <TopNavHeader location={location} />
      </div>
      {location.pathname.indexOf("activities") !== -1 &&
        location.pathname.indexOf("activities/ended") === -1 && (
          <ToggleActivityInfoButton
            onActivityInfoToggle={onActivityInfoToggle}
            chapterListShow={chapterListShow}
          />
        )}

      <div className="absolute right-5 top-0 h-full w-fit">
        <ThemeButton />
      </div>
    </nav>
  );
};

export default TopNavBar;
