import { combineReducers } from "redux";
import activities from "./activities";
import chapters from "./chapters";
import inputs from "./inputs";
import auth from "./auth";

const rootReducer = combineReducers({ activities, inputs, auth, chapters });

export default rootReducer;
