const validateFrequency = values => {
  let errors = {};

  if (!values.frequency) {
    errors.frequency = "Please select";
  }

  return errors;
};

export { validateFrequency };
