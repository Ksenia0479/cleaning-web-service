// utils - reducers
import { createReducer } from "./_utils";

const initialState = [
  { label: "Small bedroom", value: 10, type: "small" },
  { label: "Large bedroom", value: 20, type: "large" },
  {
    label: "Bathroom",
    value: 30,
    type: "bath"
  }
];

const roomsHandlers = {};

export default createReducer(initialState, roomsHandlers);
