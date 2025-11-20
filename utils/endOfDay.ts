/**
 * end of day -> setHours(23, 59, 59, 999)
 * notice : it wont change your date's refrence directy
 */
const startOfDay = (date: Date): Date => {
  const _date = new Date(date);
  // * start of the day ================ >
  _date.setHours(23, 59, 59, 999);
  return _date;
};

export default startOfDay;
