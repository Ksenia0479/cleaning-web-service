// utils
import { createReducer } from "../_utils";

const initialState = { pageSize: 5 };
const reviewsHandlers = {};

export default createReducer(initialState, reviewsHandlers);
