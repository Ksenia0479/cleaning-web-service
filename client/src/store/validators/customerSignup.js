// utils - validators
import {
  validatePersonalInformation,
  validatePassword,
  validateContact
} from "./utils";

const validate = values => {
  const { firstName, lastName } = validatePersonalInformation(values);
  const { password, confirmPassword } = validatePassword(values);
  const { contact } = validateContact(values);

  return {
    contact,
    password,
    confirmPassword,
    firstName,
    lastName
  };
};

export default validate;
