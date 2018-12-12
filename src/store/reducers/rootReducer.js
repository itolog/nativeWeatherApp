import { combineReducers } from "redux";
import dataLoad from "./dataLoad";
import dataLoadHourly from "./dataLoadHourly";
import dataLoadDayly from "./dataLoadDayly";

const reducer = combineReducers({ dataLoad, dataLoadHourly, dataLoadDayly });

export default reducer;
