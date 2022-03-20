import { useDispatch, useSelector } from "react-redux";
import { setLayout } from "@/redux/layouts";

export const useLayouts = () => {
  const dispatch = useDispatch();
  const mainLayout = useSelector((state) => state.layouts.main);

  const onLayoutChange = (layout) => {
    dispatch(setLayout(layout));
  };

  return { mainLayout, onLayoutChange };
};
