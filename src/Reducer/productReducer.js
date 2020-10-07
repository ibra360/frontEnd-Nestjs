import { SAVE_PRODUCT } from "../Types/types";

export default function (state=[], action) {
  switch (action.type) {
    case SAVE_PRODUCT:
      return action.payload;

    default:
      return state;
  }
}
