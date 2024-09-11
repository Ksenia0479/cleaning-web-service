// api
import { cleaningServiceAPI } from "store/api";

// constants
import * as types from "store/constants";

// actions
import { fetchImage } from "store/actions";

// utils
import { history, removeTokens } from "utils";

const signinUser = user => {
  return {
    types: [
      types.SIGNIN_USER.REQUEST,
      types.SIGNIN_USER.SUCCESS,
      types.SIGNIN_USER.FAILURE
    ],
    shouldCallAPI: state => !state.auth.signedIn,
    callAPI: async () => {
      return await cleaningServiceAPI.post("/users/signin", user);
    },
    callExtraDispatchersOnSuccess: ({ dispatch, getState }) => {
      const { role } = getState().auth.user.data;

      dispatch(fetchImage());

      role === "company" && history.push("/orders/future");
      role === "customer" && history.push("/booking/step-zero");
    }
  };
};

const signoutUser = () => {
  return {
    types: ["", types.USER_SIGN_OUT, ""],
    callAPI: async () => {
      const token = localStorage.getItem("jwtToken");
      return await cleaningServiceAPI.post(
        "/users/signout",
        {},
        { headers: { Authorization: token } }
      );
    },
    callExtraDispatchersOnSuccess: ({ dispatch, getState }) => {
      const { data } = getState().auth.tokens;
      removeTokens(data);

      history.push("/signin");
    }
  };
};

const closeAccount = () => {
  return {
    types: [
      types.CLOSE_USER.REQUEST,
      types.CLOSE_USER.SUCCESS,
      types.CLOSE_USER.FAILURE
    ],
    callAPI: async () => {
      const token = localStorage.getItem("jwtToken");
      return await cleaningServiceAPI.delete("/users/me", {
        headers: { Authorization: token }
      });
    },
    callExtraDispatchersOnSuccess: ({ dispatch, getState }) => {
      const { data } = getState().auth.tokens;
      removeTokens(data);

      history.push("/signup/customer");
    }
  };
};

export { signinUser, signoutUser, closeAccount };
