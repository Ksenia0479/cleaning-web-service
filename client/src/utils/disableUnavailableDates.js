import _ from "lodash";
import moment from "moment";

// TODO
const disableUnavailableDates = date => {
  const forbiddenDates = [1, 3, 4];
  return (
    moment(date).day() === 0 ||
    moment(date).day() === 6 ||
    _.includes(forbiddenDates, moment(date).date())
  );
};

export { disableUnavailableDates };
