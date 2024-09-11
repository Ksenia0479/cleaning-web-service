import _ from "lodash";

// actions
import { updateData, paginateData } from "store/actions";

const sortData = (sorters, dataName) => {
  return (dispatch, getState) => {
    const {
      [_.toLower(dataName)]: { filteredData: { data = [] } = {} } = {}
    } = getState();

    dispatch({
      type: `UPDATE_${_.toUpper(dataName)}_BY_OPTIONS`,
      payload: { data, sorters }
    });

    const SORTERS = "SORTERS";
    dispatch(updateData(sorters, SORTERS));

    dispatch(paginateData(_.toUpper(dataName)));
  };
};

export { sortData };
