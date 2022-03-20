import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/redux/themes";

export const useClientThemes = () => {
  const theme = useSelector((state) => state.themes.theme);
  const dispatch = useDispatch();

  const setClientTheme = (theme) => {
    dispatch(setTheme(theme));
  };

  return { theme, setClientTheme };
};
