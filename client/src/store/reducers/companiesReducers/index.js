import { combineReducers } from "redux";

// constants
import { FETCH_COMPANIES } from "store/constants";

// utils
import { filterData, paginateData, sortData, requestData } from "../_utils";

// reducers
import companiesReducer from "./companiesReducer";

const COMPANIES = "COMPANIES";
export default combineReducers({
  fetchedData: requestData(companiesReducer, FETCH_COMPANIES),
  filteredData: sortData(filterData(companiesReducer, COMPANIES), COMPANIES),
  paginatedData: paginateData(companiesReducer, COMPANIES)
});
