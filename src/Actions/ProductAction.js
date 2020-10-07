import { SAVE_PRODUCT } from "../Types/types";

export const saveUser = (data) => {
  return {
    type: SAVE_PRODUCT,
    payload: data,
    //pay:pay
  };
};
