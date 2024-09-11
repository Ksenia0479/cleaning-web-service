// utils - validators
import {
  validateAddress,
  validateContact,
  validateImage,
  validatePassword,
  validateServices,
  validatePersonalInformation,
  validateRooms
} from "./utils";

const validate = values => {
  const { address } = validateAddress(values);
  const { contact } = validateContact(values);
  const { image } = validateImage(values);
  const { password, confirmPassword } = validatePassword(values);
  const { services } = validateServices(values);
  const { companyName } = validatePersonalInformation(values);
  const { rooms } = validateRooms(values);

  return {
    address,
    contact,
    image,
    password,
    confirmPassword,
    services,
    companyName,
    rooms
  };
};

export default validate;
