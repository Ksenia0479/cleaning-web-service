import { LOCATION_CHANGE } from "connected-react-router";

// utils
import { history } from "utils";

// utils - reducers
import { createReducer } from "../_utils";

const initialState = {
  pageSize: 4,
  previousLocation: history.location.pathname
};

const companiesHandlers = {
  [LOCATION_CHANGE]: (state, action) => {
    const { previousLocation } = state;
    const {
      payload: {
        location: { pathname }
      }
    } = action;

    if (pathname !== previousLocation) {
      return { previousLocation: pathname };
    }

    return { ...initialState, ...state, previousLocation: pathname };
  }
};

export default createReducer(initialState, companiesHandlers);
