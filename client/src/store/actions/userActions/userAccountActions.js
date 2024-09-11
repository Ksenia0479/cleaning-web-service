// api
import { cleaningServiceAPI } from "store/api";

// constants
import { FETCH_ACCOUNT, UPDATE_ACCOUNT } from "store/constants";

// actions
import { addAlert } from "store/actions";

// utils
import { getTokens } from "utils";

const fetchUserAccountData = () => {
  return {
    types: [
      FETCH_ACCOUNT.REQUEST,
      FETCH_ACCOUNT.SUCCESS,
      FETCH_ACCOUNT.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.get("/users/me/account-data", {
        headers: { Authorization: token }
      });
    }
  };
};

const updateUserAccountData = data => {
  return {
    types: [
      UPDATE_ACCOUNT.REQUEST,
      UPDATE_ACCOUNT.SUCCESS,
      UPDATE_ACCOUNT.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.patch("/users/me/account-data", data, {
        headers: { Authorization: token }
      });
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      const message = "The password is successfully updated!";
      const alertType = "success";
      dispatch(addAlert(message, alertType));
    }
  };
};

export { fetchUserAccountData, updateUserAccountData };
