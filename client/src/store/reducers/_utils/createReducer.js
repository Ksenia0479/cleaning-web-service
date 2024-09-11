export default (initialState, handlers = {}) => {
  return (state = initialState, action) => {
    const { type = "" } = action;
    if (handlers.hasOwnProperty(type)) {
      return handlers[type](state, action);
    }
    return state;
  };
};
