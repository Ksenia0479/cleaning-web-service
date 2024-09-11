import { validatePersonalInformation, validateAddress } from "./utils";

const validate = values => {
  const { companyName, firstName, lastName } = validatePersonalInformation(
    values
  );
  const { address } = validateAddress(values);

  return { firstName, lastName, companyName, address };
};

export default validate;
