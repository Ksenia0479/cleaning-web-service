// utils
import { createReducer } from "../_utils";

const initialState = {
  isLoaded: false,
  error: false,
  data: {}
};
const tokensHandlers = {};

export default createReducer(initialState, tokensHandlers);
