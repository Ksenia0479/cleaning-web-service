import moment from "moment";

const formatDate = date => {
  return moment(date).format("LL");
};

export { formatDate };
