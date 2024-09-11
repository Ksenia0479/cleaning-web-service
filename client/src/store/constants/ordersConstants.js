// utils
import { generateActions } from "utils/generateActions";

const CREATE_ORDER = generateActions("CREATE_ORDER");
const FETCH_ORDERS = generateActions("FETCH_ORDERS");
const APPROVE_ORDER = generateActions("APPROVE_ORDER");
const COMPLETE_ORDER = generateActions("COMPLEE_ORDER");

const DENY_ORDER = "DENY_ORDER";

const REGISTER_ORDER = "REGISTER_ORDER";
const CLEAR_REGISTER_BOOKING_DATA = "CLEAR_REGISTER_BOOKING_DATA";

export {
  DENY_ORDER,
  FETCH_ORDERS,
  CREATE_ORDER,
  APPROVE_ORDER,
  COMPLETE_ORDER,
  REGISTER_ORDER,
  CLEAR_REGISTER_BOOKING_DATA
};
