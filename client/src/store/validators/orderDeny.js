const validate = values => {
  const errors = {};

  if (!values.message) {
    errors.message = "Reason must be provided";
  }
  return errors;
};

export default validate;
