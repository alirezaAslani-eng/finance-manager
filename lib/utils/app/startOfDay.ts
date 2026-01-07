/**
 * beginning of day -> setHours(0, 0, 0)
 * notice : it wont change your date's refrence directy 
 */
const startOfDay = (date: Date): Date => {
  const _date = new Date(date);
  // * start of the day ================ >
  _date.setHours(0, 0, 0);
  return _date;
};

export default startOfDay;
