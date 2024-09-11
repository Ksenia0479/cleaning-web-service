import { combineReducers } from "redux";

// reducers
import avatarReducer from "./avatarReducer";
import previewImageReducer from "./previewImageReducer";

export default combineReducers({
  avatar: avatarReducer,
  previewImage: previewImageReducer
});
