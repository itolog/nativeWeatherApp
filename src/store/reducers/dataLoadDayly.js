import { LOAD_DAYLY } from "../actions/actionTypes";

const initialState = {
  dayly: []
};

export default function dataLoadDayly(state = initialState, action) {
  switch (action.type) {
    case LOAD_DAYLY:
      return { dayly: action.payLoad };
    default:
      return state;
  }
}
