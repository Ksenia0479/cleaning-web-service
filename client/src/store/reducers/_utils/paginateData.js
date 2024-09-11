const initialState = {
  data: [],
  pageNumber: 1,
  pageSize: 4
};

export default (reducer, dataName) => {
  return (state, action) => {
    const {
      type = "",
      payload: { data: dataToBePaginated = [] } = {}
    } = action;

    switch (type) {
      case `PAGINATE_${dataName}`:
        const { pageSize = 4, pageNumber = 1 } = state;
        return {
          ...initialState,
          ...state,
          pageNumber: pageNumber + 1,
          data: dataToBePaginated.slice(0, pageNumber * pageSize)
        };
      default:
        return reducer(state, action);
    }
  };
};
