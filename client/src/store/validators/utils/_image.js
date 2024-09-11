import _ from "lodash";

const validateImage = values => {
  const errors = {};
  const fileMaxSize = 500 * 1000; // 500KB

  if (values.file && values.file[0]) {
    const file = values.file[0];
    const { name, size } = file;
    if (
      !(
        _.endsWith(name, ".jpg") ||
        _.endsWith(name, ".png") ||
        _.endsWith(name, ".jpeg")
      )
    ) {
      errors.image = "The image must be a .jpg, .jpeg or .png file format";
    }
    if (size > fileMaxSize) {
      errors.image = "The image size must be less or equal to 500KB size";
    }
  }

  return errors;
};

export { validateImage };
