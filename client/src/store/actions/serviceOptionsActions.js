import _ from "lodash";

const getServices = ({ name } = {}) => {
  return { type: `GET_${_.upperCase(name)}` };
};

const addService = ({ name, option }) => {
  return { type: `ADD_${_.upperCase(name)}`, payload: option };
};

const removeService = ({ name, option }) => {
  return { type: `REMOVE_${_.upperCase(name)}`, payload: option };
};

export { getServices, removeService, addService };
