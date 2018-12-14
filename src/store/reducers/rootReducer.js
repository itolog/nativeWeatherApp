import { combineReducers } from "redux";
import dataLoad from "./dataLoad";
import dataLoadHourly from "./dataLoadHourly";
import dataLoadDaily from "./dataLoadDaily";

const reducer = combineReducers({ dataLoad, dataLoadHourly, dataLoadDaily });

export default reducer;
