const validatePersonalInformation = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required!";
  } else if (!/^[a-zA-Zа-яА-Я]+$/.test(values.firstName)) {
    errors.firstName = "What's your name?";
  }

  if (!values.lastName) {
    errors.lastName = "Required!";
  } else if (!/^[a-zA-Zа-яА-Я]+$/.test(values.lastName)) {
    errors.lastName = "What's your name?";
  }

  if (!values.companyName) {
    errors.companyName = "What's your company name?";
  }

  return errors;
};

export { validatePersonalInformation };
