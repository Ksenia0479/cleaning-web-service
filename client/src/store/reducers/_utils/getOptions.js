const initialState = {
  data: []
};

export default (reducer, dataType) => {
  return (state, action) => {
    const { type = "", payload: { data } = {} } = action;
    switch (type) {
      case dataType:
        return { ...initialState, ...state, data };
      default:
        return reducer(state, action);
    }
  };
};
