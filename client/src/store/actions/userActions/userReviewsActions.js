// api
import { cleaningServiceAPI } from "store/api";

// constants
import { CREATE_REVIEW, FETCH_REVIEWS } from "store/constants";

// actions
import { addAlert, paginateData } from "store/actions";

// utils
import { history, getTokens } from "utils";

const fetchReviews = id => {
  return {
    types: [
      FETCH_REVIEWS.REQUEST,
      FETCH_REVIEWS.SUCCESS,
      FETCH_REVIEWS.FAILURE
    ],
    callAPI: async () => {
      return await cleaningServiceAPI.get(`/companies/${id}/reviews`);
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      const REVIEWS = "REVIEWS";
      const paginatedDataKey = "fetchedData";
      dispatch(paginateData(REVIEWS, paginatedDataKey));
    }
  };
};

const createReview = (review, id) => {
  return {
    types: [
      CREATE_REVIEW.REQUEST,
      CREATE_REVIEW.SUCCESS,
      CREATE_REVIEW.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.post(
        `/reviews/${id}/create`,
        { review },
        { headers: { Authorization: token } }
      );
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      const alertMessage = "Thanks for your review";
      const alertType = "success";
      dispatch(addAlert(alertMessage, alertType));

      history.push("/booking/step-one");
    }
  };
};

export { createReview, fetchReviews };
