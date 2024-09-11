// constants
import { SET_USER_CONSENT } from "store/constants";

// utils - reducers
import { createReducer } from "./_utils";

const initialState = {
  error: false,
  isLoaded: false,
  userConsent: Notification.permission,
  data: { isUserSubscribed: false }
};

const notificationsHandlers = {
  [SET_USER_CONSENT]: (state, action) => {
    const { payload = {} } = action;
    return { ...state, userConsent: payload };
  }
};

export default createReducer(initialState, notificationsHandlers);
