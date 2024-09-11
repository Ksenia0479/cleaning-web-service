import _ from "lodash";

export default (reducer, dataName) => {
  return (state, action) => {
    const { type = "", payload = {} } = action;
    switch (type) {
      case `GET_${dataName}`:
        return state;
      case `REMOVE_${dataName}`:
        return _.filter(state, service => {
          return service.label !== payload.label;
        });
      case `ADD_${dataName}`:
        return _.concat(state, payload);
      default:
        return reducer(state, action);
    }
  };
};
