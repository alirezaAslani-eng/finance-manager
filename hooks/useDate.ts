import React from "react";

function useDate(date: string | Date = new Date()) {
  //  * Date Seting ============ >>
  const fa_date = new Date(date).toLocaleString("fa-IR", {
    timeZone: "Asia/Tehran",
  });
  // * Separate Time and Date ======== >>
  const splited = fa_date.split(",");

  // * Return === >>>
  return { time: splited[1], date: splited[0] };
}

export default useDate;
