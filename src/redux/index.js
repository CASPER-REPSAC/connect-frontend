import { combineReducers } from "redux";
import activities from "./activities";
import chapters from "./chapters";
import inputs from "./inputs";
import auth from "./auth";
import loadings from "./loadings";
import alerts from "./alerts";
import shows from "./shows";
import search from "./search";
import themes from "./themes";
import layouts from "./layouts";

const rootReducer = combineReducers({
  activities,
  inputs,
  auth,
  chapters,
  loadings,
  alerts,
  shows,
  search,
  themes,
  layouts,
});

export default rootReducer;
