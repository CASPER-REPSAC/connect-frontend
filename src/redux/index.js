import { combineReducers } from "redux";
import activities from "./activities";
import inputs from "./inputs";
import auth from "./auth";

const rootReducer = combineReducers({ activities, inputs, auth });

export default rootReducer;
