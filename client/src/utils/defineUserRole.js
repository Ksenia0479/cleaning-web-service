import _ from "lodash";

// utils
import { history } from "utils";

const defineUserRole = () => {
  const role = _.last(_.split(history.location.pathname, "/"));
  return role;
};

export { defineUserRole };
