// api
import { cleaningServiceAPI } from "../../api";

// constants
import * as types from "../../constants";

// utils
import { setTokens, getTokens } from "utils";

const fetchJWT = () => {
  return {
    types: [
      types.FETCH_JWT.REQUEST,
      types.FETCH_JWT.SUCCESS,
      types.FETCH_JWT.FAILURE
    ],
    callAPI: async () => {
      const { refreshToken } = getTokens();
      return await cleaningServiceAPI.post("/token", { refreshToken });
    },
    callExtraDispatchersOnSuccess: ({ dispatch, getState }) => {
      const { data } = getState().auth.tokens;
      setTokens(data);
    }
  };
};

export { fetchJWT };
