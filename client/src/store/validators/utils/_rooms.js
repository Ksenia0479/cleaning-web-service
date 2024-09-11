import _ from "lodash";

const validateRooms = values => {
  const errors = {};

  if (!values.rooms || !values.rooms.length) {
    errors.rooms = { _error: "At least one room option should be selected" };
  } else {
    const roomsArrayErrors = [];

    _.forEach(values.rooms, (room, index) => {
      if (_.isEmpty(room)) {
        roomsArrayErrors[index] = "Select room";
      }
    });
    if (roomsArrayErrors.length) {
      errors.rooms = roomsArrayErrors;
    }
  }

  return errors;
};

export { validateRooms };
