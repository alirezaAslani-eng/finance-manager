import faNumToEnNum from "./faNumtoEnNum";

interface GetFaDateReturnType {
  fa_date: string;
  fa_time: string;
}
type getFaDateType = (date: Date) => GetFaDateReturnType;

/**
 * takes a date value and convert it into a persian format
 */
const getFaDate: getFaDateType = (date: Date) => {
  // * Ir full Date -- >
  const faDate = date.toLocaleString("fa-IR");

  // * Persian-Day -- >
  const day = getDay(faDate);
  // * Persian-Month -- >
  const month = getFaMonth(faDate);
  // * Persian-Year -- >
  const year = getYear(faDate);
  // * format date here --->

  return {
    fa_date: `${day} ${month} ${year}`,
    fa_time: getTime(faDate),
  };
};

export default getFaDate;

function getDay(toLocalStringValue: string) {
  const day = toLocalStringValue.split(",")[0].split("/")[2]; // * Find day in the string
  if (faNumToEnNum(day).startsWith("0")) return day.replace("0", "");
  return day;
}

function getYear(toLocalStringValue: string): string {
  return toLocalStringValue.split(",")[0].split("/")[0];
}

function getTime(toLocalStringValue: string): string {
  const splitedTime = toLocalStringValue.split(",")[1].split(":");
  const time = faNumToEnNum(`${splitedTime[1]} : ${splitedTime[0]}`);
  return time;
}

function getFaMonth(toLocalStringValue: string) {
  const fa_month = toLocalStringValue.split(",")[0].split("/")[1];
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
