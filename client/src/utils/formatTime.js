import moment from "moment";

const formatTime = time => {
  return moment(time).format("LT");
};

export { formatTime };
