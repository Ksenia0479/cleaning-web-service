import _ from "lodash";

const validateAddress = values => {
  const errors = {};

  const messages = {
    street: "Street must be provided!",
    city: "City must be provided!",
    apartmentNumber: "Apartment number must be provided!",
    zipCode: "Zip code must be provided!"
  };

  _.mapKeys(messages, (message, prop) => {
    if (!values.address || !values.address[prop]) {
      return (errors.address = _.merge(errors.address, { [prop]: message }));
    }
  });

  return errors;
};

export { validateAddress };
