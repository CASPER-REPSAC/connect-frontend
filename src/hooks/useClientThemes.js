import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, setTheme } from "@/redux/themes";

export const useClientThemes = () => {
  const theme = useSelector((state) => state.themes.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
  }, []);

  const setClientTheme = (theme) => {
    dispatch(setTheme(theme));
  };

  return { theme, setClientTheme };
};
