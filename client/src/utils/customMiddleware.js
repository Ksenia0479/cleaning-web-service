import _ from "lodash";

// actions
import { fetchJWT, addAlert } from "store/actions";

// utils
import { setTokens } from "utils";

const customMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      callExtraDispatchersOnFailure = () => {},
      callExtraDispatchersOnSuccess = () => {},
    } = action;

    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    if (!types) {
      return next(action);
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    if (
      !_.isArray(types) ||
      types.length !== 3 ||
      !_.every(types, (type) => typeof type === "string")
    ) {
      throw new Error("Expected an array of three string types.");
    }

    if (
      typeof (
        callAPI ||
        callExtraDispatchersOnFailure ||
        callExtraDispatchersOnSuccess
      ) !== "function"
    ) {
      throw new Error("Expected call to be a function.");
    }

    const [requestType, successType, failureType] = types;

    dispatch({ type: requestType });
    return callAPI({ dispatch, getState })
      .then(({ data }) => {
        if (data.tokens) {
          setTokens(data.tokens);
        }
        dispatch({ type: successType, payload: { data } });
        callExtraDispatchersOnSuccess({ dispatch, getState });
      })
      .catch((err) => {
        console.log(err);
        const isJWTexpired =
          err.response && err.response.data === "jwt expired";
        if (isJWTexpired) {
          return dispatch(fetchJWT());
        }
        console.log(err.message);
        const alertMessage = err.response.data;
        const alertType = "error";
        dispatch(addAlert(alertMessage, alertType));

        dispatch({ type: failureType });
        callExtraDispatchersOnFailure({ dispatch, getState });
      });
  };

export { customMiddleware };
