import { combineReducers } from "redux";

// constants
import { FETCH_REVIEWS } from "store/constants";

// utils
import { paginateData, requestData } from "../_utils";

// reducers
import reviewsReducer from "./reviewsReducer";

const REVIEWS = "REVIEWS";
export default combineReducers({
  fetchedData: requestData(reviewsReducer, FETCH_REVIEWS),
  paginatedData: paginateData(reviewsReducer, REVIEWS)
});
