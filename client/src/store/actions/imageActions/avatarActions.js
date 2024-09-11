// api
import { cleaningServiceAPI } from "store/api";

// constants
import { FETCH_IMAGE } from "store/constants";

// actions
import { addAlert, updatePreviewImage } from "store/actions";

// utils
import { getTokens } from "utils";

const fetchImage = () => {
  return {
    types: [FETCH_IMAGE.REQUEST, FETCH_IMAGE.SUCCESS, FETCH_IMAGE.FAILURE],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.get("/users/me/avatar", {
        headers: { Authorization: token }
      });
    },
    callExtraDispatchersOnSuccess: ({ dispatch, getState }) => {
      const {
        avatar: { data: url }
      } = getState().images;
      dispatch(updatePreviewImage(url));
    }
  };
};

const updateImage = avatar => {
  return {
    types: [FETCH_IMAGE.REQUEST, FETCH_IMAGE.SUCCESS, FETCH_IMAGE.FAILURE],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.patch("/users/me/avatar", avatar, {
        headers: { Authorization: token }
      });
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      const message = "The image has been successfully updated!";
      const alertType = "success";

      dispatch(addAlert(message, alertType));
    }
  };
};

export { fetchImage, updateImage };
