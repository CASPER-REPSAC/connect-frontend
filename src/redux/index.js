import { combineReducers } from "redux";
import activities from "./activities";
import chapters from "./chapters";
import inputs from "./inputs";
import auth from "./auth";
import submits from "./submits";
import alerts from "./alerts";

const rootReducer = combineReducers({
  activities,
  inputs,
  auth,
  chapters,
  submits,
  alerts,
});

export default rootReducer;
