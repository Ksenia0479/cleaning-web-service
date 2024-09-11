const converDateTimeToISO = ({ date, time }) => {
  const isoDate = new Date(date).toISOString().substring(0, 10);
  const isoTime = new Date(time).toISOString().substring(10, time.length);

  return Date.parse(`${isoDate}${isoTime}`);
};

module.exports = converDateTimeToISO;
