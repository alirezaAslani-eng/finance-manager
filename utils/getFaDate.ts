interface GetFaDateReturnType {
  fa_date: string;
  fa_time: string;
}
type getFaDateType = (date: Date) => GetFaDateReturnType;

const faNumToEnNum = (fa_month: string) =>
  fa_month.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
/**
 * takes a date value and convert it into a persian format
 */
const getFaDate: getFaDateType = (date: Date) => {
  // * Ir full Date -- >
  const faDate = date.toLocaleString("fa-IR");


  
  /**
   * getMonth : -> input ۰۱ -> output فروردین
   */
  function getMonth() {
    const fa_month = faDate.split(",")[0].split("/")[1];

    const enMonth = faNumToEnNum(fa_month);
    switch (enMonth) {
      case "1":
        return "فروردین";
      case "2":
        return "اردیبهشت";
      case "3":
        return "خرداد";
      case "4":
        return "تیر";
      case "5":
        return "مرداد";
      case "6":
        return "شهریور";
      case "7":
        return "مهر";
      case "8":
        return "آبان";
      case "9":
        return "آذر";
      case "10":
        return "دی";
      case "11":
        return "بهمن";
      case "12":
        return "اسفند";
      default:
        return "";
    }
  }

  function getDay(day: string = faDate.split(",")[0].split("/")[2]) {
    if (faNumToEnNum(day).startsWith("0")) return day.replace("0", "");
    return day;
  }

  function getYear(): string {
    return faDate.split(",")[0].split("/")[0];
  }

  function getTime(): string {
    const splitedTime = faDate.split(",")[1].split(":");
    const time = faNumToEnNum(`${splitedTime[1]} : ${splitedTime[0]}`);
    return time;
  }

  // * Persian-Day -- >
  const Ir_day = getDay();
  // * Persian-Month -- >
  const Ir_month = getMonth();
  // * Persian-Year -- >
  const Ir_year = getYear();
  // * format date here --->

  console.log(faDate);

  return {
    fa_date: `${Ir_day} ${Ir_month} ${Ir_year}`,
    fa_time: getTime(),
  };
};

export default getFaDate;
