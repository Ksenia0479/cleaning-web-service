// utils
import { generateActions } from "utils/generateActions";

const SIGNUP_USER = generateActions("SIGNUP_USER");
const SEND_SIGN_UP_CONFIRMATION_EMAIL = generateActions(
  "SEND_SIGN_UP_CONFIRMATION_EMAIL"
);

export { SIGNUP_USER, SEND_SIGN_UP_CONFIRMATION_EMAIL };
