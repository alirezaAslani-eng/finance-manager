
function identifyJalaliMonth(month: number) {
  switch (month) {
    case 0:
      return "فروردین";
    case 1:
      return "اردیبهشت";
    case 2:
      return "خرداد";
    case 3:
      return "تیر";
    case 4:
      return "مرداد";
    case 5:
      return "شهریور";
    case 6:
      return "مهر";
    case 7:
      return "آبان";
    case 8:
      return "آذر";
    case 9:
      return "دی";
    case 10:
      return "بهمن";
    case 11:
      return "اسفند";
    default:
      return "";
  }
}

export default identifyJalaliMonth;
