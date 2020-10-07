import { SAVE_USER } from "../Types/types";

export default function (state={}, action) {
  switch (action.type) {
    case SAVE_USER:
      return action.payload;

    default:
      return state;
  }
}
