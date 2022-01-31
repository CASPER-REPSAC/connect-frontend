import { combineReducers } from "redux";
import activities from "./activities";
import inputs from "./inputs";

const rootReducer = combineReducers({ activities, inputs });

export default rootReducer;
