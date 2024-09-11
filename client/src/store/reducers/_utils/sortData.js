import _ from "lodash";

export default (reducer, dataName) => {
  return (state, action) => {
    const { type = "" } = action;
    switch (type) {
      case `UPDATE_${dataName}_BY_OPTIONS`:
        const { payload: { data = [], sorters = {} } = {} } = action;

        if (sorters["companySorter"]) {
          return {
            ...state,
            data: _.orderBy(data, [sorters["companySorter"]], ["desc"])
          };
        }

        return {
          ...state,
          data: _.orderBy(data, _.keys(sorters), _.values(sorters))
        };

      default:
        return reducer(state, action);
    }
  };
};
