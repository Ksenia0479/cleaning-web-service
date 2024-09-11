// utils
import { generateActions } from "utils/generateActions";

const UPDATE_ACCOUNT = generateActions("UPDATE_ACCOUNT");
const FETCH_ACCOUNT = generateActions("FETCH_ACCOUNT");

export { FETCH_ACCOUNT, UPDATE_ACCOUNT };
