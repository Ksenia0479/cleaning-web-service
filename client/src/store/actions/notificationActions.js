// api
import { cleaningServiceAPI } from "store/api";

// constants
import {
  UPDATE_SUBSCRIPTION,
  FETCH_SUBSCRIPTION_STATUS,
  SET_USER_CONSENT
} from "store/constants";

// utils
import {
  getTokens,
  askUserPermission,
  createNotificationSubscription,
  removeNotificationSubscription
} from "utils";

const getUserPermission = () => {
  return dispatch => {
    askUserPermission().then(consent => {
      dispatch({ type: SET_USER_CONSENT, payload: consent });
    });
  };
};

const fetchExistingSubscriptionStatus = () => {
  return {
    types: [
      FETCH_SUBSCRIPTION_STATUS.REQUEST,
      FETCH_SUBSCRIPTION_STATUS.SUCCESS,
      FETCH_SUBSCRIPTION_STATUS.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.get("/subscription/exists", {
        headers: { Authorization: token }
      });
    }
  };
};

const createSubscriptionOnServer = subscription => {
  return {
    types: [
      UPDATE_SUBSCRIPTION.REQUEST,
      UPDATE_SUBSCRIPTION.SUCCESS,
      UPDATE_SUBSCRIPTION.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.post("/subscribe", subscription, {
        headers: { Authorization: token }
      });
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      dispatch(fetchExistingSubscriptionStatus());
    }
  };
};

const removeSubscriptionOnServer = () => {
  return {
    types: [
      UPDATE_SUBSCRIPTION.REQUEST,
      UPDATE_SUBSCRIPTION.SUCCESS,
      UPDATE_SUBSCRIPTION.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.delete("/unsubscribe", {
        headers: { Authorization: token }
      });
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      dispatch(fetchExistingSubscriptionStatus());
    }
  };
};

const initializeSubscription = () => {
  return (dispatch, getState) => {
    const {
      notifications: {
        data: { isUserSubscribed },
        userConsent
      }
    } = getState();

    if (!isUserSubscribed && userConsent !== "denied") {
      dispatch(getUserPermission());
      createNotificationSubscription()
        .then(subscription => {
          dispatch(createSubscriptionOnServer(subscription));
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      removeNotificationSubscription()
        .then(subscription => {
          if (subscription) {
            return subscription.unsubscribe();
          }
        })
        .catch(err => {
          console.error("Error unsubscribing", err);
        })
        .then(() => {
          dispatch(removeSubscriptionOnServer());
        });
    }
  };
};

export { initializeSubscription, fetchExistingSubscriptionStatus };
