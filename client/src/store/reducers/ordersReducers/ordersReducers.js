// constants
import { CREATE_ORDER } from "store/constants";

// utils
import { createReducer } from "../_utils";

const initialState = { data: [], pageSize: 6, message: "No orders found" };

const ordersHandlers = {
  [CREATE_ORDER.SUCCESS]: (state, action) => {
    const { payload: { data = {} } = {} } = action;
    return { ...state, data };
  }
};

export default createReducer(initialState, ordersHandlers);
