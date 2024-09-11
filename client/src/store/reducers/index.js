import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";

// constants
import {
  USER_SIGN_OUT,
  FETCH_SUBSCRIPTION_STATUS,
  UPDATE_SORTERS,
  UPDATE_FILTERS
} from "../constants";

// utils
import { history } from "../../utils";

// utils - reducers
import { getData, getOptions, requestData } from "./_utils";

// reducers
import authReducers from "./authReducers";
import bookingReducers from "./bookingReducers";
import companiesReducers from "./companiesReducers";
import imageReducers from "./imageReducers";
import ordersReducers from "./ordersReducers";
import reviewsReducers from "./reviewsReducers";
import userReducers from "./userReducers";
import alertsReducer from "./alertsReducer";
import filtersReducers from "./filtersReducers";
import notificationsReducer from "./notificationsReducer";
import registeredOrderReducer from "./registeredOrderReducer";
import roomsReducer from "./roomsReducer";
import selectedCompanyReducer from "./selectedCompanyReducer";
import servicesReducer from "./servicesReducer";
import sortersReducer from "./sortersReducer";

const appReducer = combineReducers({
  router: connectRouter(history),
  form: formReducer,
  auth: authReducers,
  user: userReducers,
  alerts: alertsReducer,
  images: imageReducers,
  booking: bookingReducers,
  orders: ordersReducers,
  reviews: reviewsReducers,
  companies: companiesReducers,
  registeredOrder: registeredOrderReducer,
  selectedCompany: selectedCompanyReducer,
  rooms: getData(roomsReducer, "ROOMS"),
  services: getData(servicesReducer, "SERVICES"),
  sorters: getOptions(sortersReducer, UPDATE_SORTERS),
  filters: getOptions(filtersReducers, UPDATE_FILTERS),
  notifications: requestData(notificationsReducer, FETCH_SUBSCRIPTION_STATUS)
});

export default (state, action) => {
  if (action.type === USER_SIGN_OUT) {
    state = {};
    return appReducer(state, action);
  }
  return appReducer(state, action);
};
