import _ from "lodash";

const initialState = { data: [], message: "" };

export default (reducer, reducerName) => {
  return (state, action) => {
    const { type = "", payload: { data = [], filters = {} } = {} } = action;

    switch (type) {
      case `SET_INITIAL_FILTERED_${reducerName}`:
        return {
          ...initialState,
          ...state,
          data
        };

      case `FILTER_${reducerName}`:
        let filteredData;

        switch (reducerName) {
          case "COMPANIES":
            const pickedFilters = _.pickBy(filters, ({ value }) => {
              return value > 0;
            });

            filteredData = _.filter(data, company => {
              return _.reduce(
                pickedFilters,
                (result, { value, compare }, key) => {
                  return value === "" || value === 0
                    ? result
                    : result && compare(company[key], value);
                },
                true
              );
            });
            break;

          case "ORDERS":
            filteredData = _.filter(data, filters);
            break;

          default:
            return state;
        }

        return {
          ...initialState,
          ...state,
          data: filteredData,
          message:
            _.isEmpty(filteredData) && `No ${_.toLower(reducerName)} found`
        };

      default:
        return reducer(state, action);
    }
  };
};
