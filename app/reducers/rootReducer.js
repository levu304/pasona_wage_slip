import { combineReducers } from 'redux';

import loginReducer from "./loginReducer";
import getSalaryByYearReducer from "./getSalaryByYearReducer";
import timeSheetReducer from "./timeSheetReducer";
import getUsersProcessReducer from "./getUsersProcessReducer";
import postAbsentReducer from "./postAbsentReducer"
import getProjectsReducer from "./getProjectsReducer";

export default combineReducers({
  loginReducer,
  getSalaryByYearReducer,
  timeSheetReducer,
  getUsersProcessReducer,
  postAbsentReducer,
  getProjectsReducer
});
