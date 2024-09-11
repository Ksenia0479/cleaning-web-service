import _ from "lodash";

// actions
import { paginateData, sortData } from "store/actions";

const setInitialFilteredData = (dataName, data) => {
  return dispatch => {
    dispatch({
      type: `SET_INITIAL_FILTERED_${dataName}`,
      payload: { data }
    });
  };
};

const filterData = (filters, dataName) => {
  return (dispatch, getState) => {
    const {
      [_.toLower(dataName)]: { fetchedData: { data } = {} } = {},
      sorters: { data: sorters }
    } = getState();

    dispatch({
      type: `FILTER_${dataName}`,
      payload: { data, filters }
    });

    dispatch(paginateData(dataName));
    dispatch(sortData(sorters, dataName));
  };
};

export { setInitialFilteredData, filterData };
