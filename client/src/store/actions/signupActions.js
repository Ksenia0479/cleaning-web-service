// api
import { cleaningServiceAPI } from "store/api";

// constants
import { SIGNUP_USER, SEND_SIGN_UP_CONFIRMATION_EMAIL } from "store/constants";

// utils
import { history } from "utils";

const signupUser = user => {
  return {
    types: [SIGNUP_USER.REQUEST, SIGNUP_USER.SUCCESS, SIGNUP_USER.FAILURE],
    callAPI: async () => {
      return await cleaningServiceAPI.post("/users/signup", user);
    },
    callExtraDispatchersOnSuccess: () => {
      history.push("/signup/confirmation");
    }
  };
};

const sendSignUpConfirmationEmail = contact => {
  return {
    types: [
      SEND_SIGN_UP_CONFIRMATION_EMAIL.REQUEST,
      SEND_SIGN_UP_CONFIRMATION_EMAIL.SUCCESS,
      SEND_SIGN_UP_CONFIRMATION_EMAIL.FAILURE
    ],
    callAPI: async () => {
      return await cleaningServiceAPI.post("/users/signup/identify", contact);
    },
    callExtraDispatchersOnSuccess: () => {
      history.push("/signup/confirmation");
    }
  };
};

export { signupUser, sendSignUpConfirmationEmail };
