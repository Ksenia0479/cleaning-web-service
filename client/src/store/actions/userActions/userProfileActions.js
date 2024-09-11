// api
import { cleaningServiceAPI } from "store/api";

// constants
import {
  FETCH_USER_PROFILE_DATA,
  UPDATE_USER_PROFILE_DATA
} from "store/constants";

// actions
import { addAlert } from "store/actions";

// utils
import { getTokens } from "utils";

const fetchUserProfileData = () => {
  return {
    types: [
      FETCH_USER_PROFILE_DATA.REQUEST,
      FETCH_USER_PROFILE_DATA.SUCCESS,
      FETCH_USER_PROFILE_DATA.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.get("/users/me/profile-data", {
        headers: { Authorization: token }
      });
    }
  };
};

const updateUserProfileData = data => {
  return {
    types: [
      UPDATE_USER_PROFILE_DATA.REQUEST,
      UPDATE_USER_PROFILE_DATA.SUCCESS,
      UPDATE_USER_PROFILE_DATA.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.patch(
        "/users/me/profile-data",
        { data },
        { headers: { Authorization: token } }
      );
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      const message = "The user's profile data has been successfully updated!";
      const allertType = "success";
      dispatch(addAlert(message, allertType));
    }
  };
};

export { fetchUserProfileData, updateUserProfileData };
