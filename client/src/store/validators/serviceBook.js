// utils - validators
import {
  validatePersonalInformation,
  validateContact,
  validateAddress,
  validateDateTime,
  validateFrequency
} from "./utils";

const messages = {
  bed: {
    small: "Select number of small bedrooms",
    large: "Select number of large bedrooms"
  },
  bath: "Please select a number of bathroom"
};

const validate = values => {
  const errors = {};

  if (!values.company) {
    errors.company = "Please select a company";
  }

  if (!values.services) {
    errors.services = "At least one service must be selected.";
  }

  if (!values.rooms || !values.rooms.bath) {
    errors.rooms = { ...errors.rooms, bath: messages.bath };
  }

  if (!values.rooms || !values.rooms.small) {
    errors.rooms = { ...errors.rooms, small: messages.bed.small };
  }

  if (!values.rooms || !values.rooms.large) {
    errors.rooms = { ...errors.rooms, large: messages.bed.large };
  }

  const { firstName, lastName } = validatePersonalInformation(values);
  const { contact } = validateContact(values);
  const { address } = validateAddress(values);
  const { date, time } = validateDateTime(values);
  const { frequency } = validateFrequency(values);

  return {
    ...errors,
    frequency,
    firstName,
    lastName,
    contact,
    address,
    date,
    time
  };
};

export default validate;
