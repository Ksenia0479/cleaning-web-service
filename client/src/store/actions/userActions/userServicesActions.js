// constants
import { FETCH_SERVICES, UPDATE_SERVICES } from "store/constants";

// api
import { cleaningServiceAPI } from "store/api";

// actions
import { addAlert } from "store/actions";

// utils
import { getTokens } from "utils";

const fetchServices = () => {
  return {
    types: [
      FETCH_SERVICES.REQUEST,
      FETCH_SERVICES.SUCCESS,
      FETCH_SERVICES.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.get("/users/me/services", {
        headers: { Authorization: token }
      });
    }
  };
};

const updateServices = data => {
  return {
    types: [
      UPDATE_SERVICES.REQUEST,
      UPDATE_SERVICES.SUCCESS,
      UPDATE_SERVICES.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.put("/users/me/services", data, {
        headers: { Authorization: token }
      });
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      const message = "The services've beed successfully updated";
      const alertType = "success";
      dispatch(addAlert(message, alertType));
    }
  };
};

export { fetchServices, updateServices };
