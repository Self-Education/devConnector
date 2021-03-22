import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
// console.log("inside root reducer - 1");

const rootReducer = combineReducers({ alert, auth, profile });

// console.log("inside root reducer - 2");

export default rootReducer;
