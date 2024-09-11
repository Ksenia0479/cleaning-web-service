import { combineReducers } from "redux";

// constants
import { GET_FREQUENCY_OPTIONS, GET_ROOM_OPTIONS } from "store/constants";

// utils
import { getOptions, removeByLocationChange } from "../_utils";

// reducers
import frequencyReducer from "./frequencyOptionReducer";
import roomOptionsReducer from "./roomOptionsReducer";

export default combineReducers({
  frequency: removeByLocationChange(
    getOptions(frequencyReducer, GET_FREQUENCY_OPTIONS)
  ),
  roomOptions: removeByLocationChange(
    getOptions(roomOptionsReducer, GET_ROOM_OPTIONS)
  )
});
