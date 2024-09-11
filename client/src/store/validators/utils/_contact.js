const validateContact = values => {
  const errors = {};

  if (!values.contact) {
    errors.contact = "Email or mobile number must be provided";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contact) &&
    !/^[0-9]{9,15}$/i.test(values.contact)
  ) {
    errors.contact = "Please enter a valid email or mobile number";
  }

  return errors;
};

export { validateContact };
