import _ from "lodash";

export const appendFormData = values => {
  const data = new FormData();

  _.mapKeys(values, (value, prop) => {
    if (prop === "address" || prop === "rooms" || prop === "services") {
      data.append(prop, JSON.stringify(value));
    } else {
      data.append(prop, value);
    }
  });

  return data;
};
