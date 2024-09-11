import _ from "lodash";

const validateServices = values => {
  const errors = {};

  if (!values.services || !values.services.length) {
    errors.services = {
      _error: "At least one service option should be selected"
    };
  } else {
    const servicesArrayErrors = [];

    _.forEach(values.services, (service, index) => {
      if (_.isEmpty(service)) {
        servicesArrayErrors[index] = "Select service";
      }
    });
    if (servicesArrayErrors.length) {
      errors.services = servicesArrayErrors;
    }
  }

  return errors;
};

export { validateServices };
