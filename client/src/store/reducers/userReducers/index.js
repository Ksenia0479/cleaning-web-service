import { combineReducers } from "redux";

// constants
import {
  FETCH_ACCOUNT,
  FETCH_USER_PROFILE_DATA,
  FETCH_SERVICES
} from "store/constants";

// utils
import { requestData } from "../_utils";

// reducers
import accountReducer from "./accountReducers";
import profileReducer from "./profileReducers";
import servicesReducer from "./servicesReducers";

export default combineReducers({
  account: requestData(accountReducer, FETCH_ACCOUNT),
  profile: requestData(profileReducer, FETCH_USER_PROFILE_DATA),
  services: requestData(servicesReducer, FETCH_SERVICES)
});
