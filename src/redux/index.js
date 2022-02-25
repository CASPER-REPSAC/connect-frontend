import { combineReducers } from "redux";
import activities from "./activities";
import chapters from "./chapters";
import inputs from "./inputs";
import auth from "./auth";
import loadings from "./loadings";
import alerts from "./alerts";
import shows from "./shows";

const rootReducer = combineReducers({
  activities,
  inputs,
  auth,
  chapters,
  loadings,
  alerts,
  shows,
});

export default rootReducer;
