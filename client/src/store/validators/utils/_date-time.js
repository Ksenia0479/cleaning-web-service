import _ from "lodash";

const validateDateTime = values => {
  let errors = {};
  const messages = {
    date: "Select date you would like us to arrive!",
    time: "Select time you would like us to arrive!"
  };

  _.mapKeys(messages, (message, prop) => {
    if (!values[prop]) {
      errors = _.merge(errors, { [prop]: message });
    }
  });

  return errors;
};

export { validateDateTime };
