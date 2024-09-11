import { combineReducers } from "redux";

// constants
import { FETCH_JWT } from "../../constants";

// utils - reducers
import { requestData } from "../_utils";

// reducers
import tokensReducer from "./tokensReducer";
import userReducer from "./userReducer";

export default combineReducers({
  tokens: requestData(tokensReducer, FETCH_JWT),
  user: userReducer
});
