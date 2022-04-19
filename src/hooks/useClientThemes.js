import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, setTheme, setPointColor } from "@/redux/themes";

export const useClientThemes = () => {
  const themes = useSelector((state) => state.themes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
  }, []);

  const setClientTheme = (theme) => {
    dispatch(setTheme(theme));
  };

  const setClientPointColor = (theme) => {
    dispatch(setPointColor(theme));
  };

  return {
    theme: themes.theme,
    pointColor: themes.pointColor,
    setClientTheme,
    setClientPointColor,
  };
};
