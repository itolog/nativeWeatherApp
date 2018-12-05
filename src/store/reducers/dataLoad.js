import { DATA_API } from "../actions/actionTypes";

const initialState = {
  currently: []
};

export default function dataLoad(state = initialState, action) {
  switch (action.type) {
    case "DATA_API":
      return { currently: action.payLoad };
    default:
      return state;
  }
}
