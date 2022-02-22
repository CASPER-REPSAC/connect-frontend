import React from "react";
import { useDispatch } from "react-redux";
import { toggleChapterList } from "@/redux/shows";

export const TopNavBar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="bg-background-50 h-9 ">
      <div>
        <button
          onClick={() => {
            dispatch(toggleChapterList());
          }}
        >
          토글
        </button>
        top nav
      </div>
    </nav>
  );
};

export default TopNavBar;
