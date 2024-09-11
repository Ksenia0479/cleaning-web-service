// utils
import { generateActions } from "utils/generateActions";

const FETCH_USER_PROFILE_DATA = generateActions("FETCH_USER_PROFILE_DATA");
const UPDATE_USER_PROFILE_DATA = generateActions("UPDATE_USER_PROFILE_DATA");

export { UPDATE_USER_PROFILE_DATA, FETCH_USER_PROFILE_DATA };
