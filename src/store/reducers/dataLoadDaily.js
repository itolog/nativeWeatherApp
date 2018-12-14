import { LOAD_DAILY } from "../actions/actionTypes";

const initialState = {
  daily: []
};

export default function dataLoadDaily(state = initialState, action) {
  switch (action.type) {
    case LOAD_DAILY:
      return { daily: action.payLoad };
    default:
      return state;
  }
}
