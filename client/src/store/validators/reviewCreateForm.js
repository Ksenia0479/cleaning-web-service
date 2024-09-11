import _ from "lodash";

const validate = values => {
  const errors = {};

  const messages = {
    header: "Header must be provided",
    description: "Please describe your review"
  };

  _.mapKeys(messages, (message, prop) => {
    if (!values.review || !values.review[prop]) {
      errors.review = _.merge(errors.review, { [prop]: message });
    }
  });

  return errors;
};

export default validate;
