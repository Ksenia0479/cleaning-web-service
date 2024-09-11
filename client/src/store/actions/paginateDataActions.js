import _ from "lodash";

const paginateData = (dataName, paginatedDataKey = "filteredData") => {
  return (dispatch, getState) => {
    const {
      [_.toLower(dataName)]: { [paginatedDataKey]: { data = [] } = {} } = {}
    } = getState();

    dispatch({
      type: `PAGINATE_${dataName}`,
      payload: { data }
    });
  };
};

export { paginateData };
