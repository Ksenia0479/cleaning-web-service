// utils
import { generateActions } from "utils/generateActions";

const SIGNIN_USER = generateActions("SIGNIN_USER");
const CLOSE_USER = generateActions("CLOSE_USER");
const FETCH_JWT = generateActions("FETCH_JWT");

const USER_SIGN_OUT = "USER_SIGN_OUT";
const SIGNOUT_USER = "LOGOUT_USER";

export { SIGNIN_USER, CLOSE_USER, SIGNOUT_USER, FETCH_JWT, USER_SIGN_OUT };
