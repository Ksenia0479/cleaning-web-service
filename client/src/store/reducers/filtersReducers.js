// utils
import { createReducer } from "./_utils";

const initialState = {
  data: {
    cleans: {
      value: 0,
      compare: (dataValue, filterValue) => dataValue >= filterValue
    },
    rating: {
      value: 0,
      compare: (dataValue, filterValue) => dataValue >= filterValue
    },
    price: {
      value: 0,
      compare: (dataValue, filterValue) => dataValue <= filterValue
    }
  }
};

const filtersHandlers = {};

export default createReducer(initialState, filtersHandlers);
