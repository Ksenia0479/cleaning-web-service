import uuid from "node-uuid";
import _ from "lodash";

// constants
import { REMOVE_ALERT, ADD_ALERT } from "store/constants";

// utils
import { createReducer } from "./_utils";

const initialState = [];

const alertsHandlers = {
  [ADD_ALERT]: (state, action) => {
    const { payload: { type = "", message = "" } = {} } = action;

    return [
      ...state,
      {
        id: uuid(),
        type,
        message,
        timeOut: 4000,
        closeOnToastrClick: true
      }
    ];
  },
  [REMOVE_ALERT]: (state, action) => {
    const { payload: { id: idToBeRemoved } = {} } = action;

    return _.filter(state, ({ id: currentId }) => {
      return currentId !== idToBeRemoved;
    });
  }
};

export default createReducer(initialState, alertsHandlers);
