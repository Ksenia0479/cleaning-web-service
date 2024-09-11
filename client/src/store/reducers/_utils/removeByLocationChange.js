import { LOCATION_CHANGE } from "connected-react-router";

export default reducer => {
  return (state, action) => {
    const { type = "" } = action;
    switch (type) {
      case LOCATION_CHANGE:
        return {};
      default:
        return reducer(state, action);
    }
  };
};
