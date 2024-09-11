const validatePassword = values => {
  const errors = {};

  if (!values.password) {
    errors.password = "Enter your new password";
  } else if (
    !/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-zа-я]){1})((?=.*[A-ZА-Я]){1}).*$/i.test(
      values.password
    )
  ) {
    errors.password =
      "Enter a combination at least six numbers, letters and punctuation marks (like ! and &)";
  }

  if (
    !values.confirmPassword ||
    !(values.confirmPassword === values.password)
  ) {
    errors.confirmPassword = "The password confirmation doesn't match";
  }

  if (!values.currentPassword) {
    errors.currentPassword = "What's your current password?";
  }

  return errors;
};

export { validatePassword };
