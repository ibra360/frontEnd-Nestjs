import { SAVE_USER } from "../Types/types";

export const saveUser = (data) => {
  return {
    type: SAVE_USER,
    payload: data,
    //pay:pay
  };
};
