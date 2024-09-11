// constants
import { CLEAR_REGISTER_BOOKING_DATA, REGISTER_ORDER } from "store/constants";

// utils - reducers
import { createReducer } from "./_utils";

const initialState = {};

const registeredOrderHandlers = {
  [REGISTER_ORDER]: (state, action) => {
    const { payload = {} } = action;
    return { ...state, ...payload };
  },
  [CLEAR_REGISTER_BOOKING_DATA]: () => {
    return initialState;
  }
};

export default createReducer(initialState, registeredOrderHandlers);
