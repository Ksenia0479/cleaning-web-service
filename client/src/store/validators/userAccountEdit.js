import { validateContact, validatePassword } from "./utils";

const validate = values => {
  const { contact } = validateContact(values);
  const { currentPassword, password, confirmPassword } = validatePassword(
    values
  );

  return { contact, currentPassword, password, confirmPassword };
};

export default validate;
