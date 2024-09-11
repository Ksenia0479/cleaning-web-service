const initialState = {
  isLoaded: false,
  error: false,
  data: []
};

export default (reducer, dataName) => {
  return (state, action) => {
    const { type = "" } = action;
    switch (type) {
      case dataName.REQUEST:
        return { ...initialState, ...state, isLoaded: false };
      case dataName.SUCCESS:
        const { payload: { data = [] } = {} } = action;
        return { ...initialState, ...state, isLoaded: true, data };
      case dataName.FAILURE:
        return { ...initialState, ...state, error: true };
      default:
        return reducer(state, action);
    }
  };
};
