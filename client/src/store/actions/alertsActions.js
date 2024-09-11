// constants
import { ADD_ALERT, REMOVE_ALERT } from "store/constants";

const addAlert = (message, type) => {
  return { type: ADD_ALERT, payload: { message, type } };
};

const removeAlert = id => {
  return { type: REMOVE_ALERT, payload: { id } };
};

export { addAlert, removeAlert };
