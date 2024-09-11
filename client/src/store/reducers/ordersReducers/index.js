import { combineReducers } from "redux";

// constants
import { FETCH_ORDERS } from "store/constants";

// utils
import { filterData, paginateData, sortData, requestData } from "../_utils";

// reducers
import ordersReducer from "./ordersReducers";

const ORDERS = "ORDERS";
export default combineReducers({
  fetchedData: requestData(ordersReducer, FETCH_ORDERS),
  filteredData: sortData(filterData(ordersReducer, ORDERS), ORDERS),
  paginatedData: paginateData(ordersReducer, ORDERS)
});
