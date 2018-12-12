import { LOAD_HOURLY } from "../actions/actionTypes";

const initialState = {
  hourly: []
};

export default function dataLoadHourly(state = initialState, action) {
  switch (action.type) {
    case LOAD_HOURLY:
      return { hourly: action.payLoad };
    default:
      return state;
  }
}
