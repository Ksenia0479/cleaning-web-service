// constants
import { SIGNIN_USER, SIGNOUT_USER, CLOSE_USER } from "store/constants";

// utils
import { createReducer } from "../_utils";

const initialState = {
  isSignedIn: false,
  error: false,
  data: {}
};

const userHandlers = {
  [SIGNIN_USER.REQUEST]: state => {
    return { ...state, isSignedIn: false };
  },
  [SIGNIN_USER.SUCCESS]: (state, action) => {
    const { payload: { data: { user = {} } = {} } = {} } = action;
    return { ...state, isSignedIn: true, data: user };
  },
  [SIGNIN_USER.FAILURE]: state => {
    return { ...state, error: true };
  },
  [SIGNOUT_USER]: state => {
    return { ...state, isSignedIn: false, user: {} };
  },
  [CLOSE_USER.SUCCESS]: state => {
    return { ...state, isSignedIn: false, user: {} };
  }
};

export default createReducer(initialState, userHandlers);
