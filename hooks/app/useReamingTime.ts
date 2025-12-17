import React, { useEffect, useState } from "react";

function useReamingTime(futureMsDate: number) {
  // * Resloved the future date to the ms format which tell us how mush we shoud wait =========== >
  const [msTime, setMsTime] = useState(0);

  // * semanticFormat is An understandable format for user (it gets update and cause re render once a second) ============= >
  const [semanticFormat, setSemanticFormat] = useState<string>("00:00");

  // * isFnished = false means we are still wating till futureMsDate ==================== >
  const [isFnished, setIsFnished] = useState(true);

  useEffect(() => {
    // * Responsble for update ms time ================ >
    const now = new Date().getTime();
    if (now > futureMsDate) {
      setMsTime(0);
      return;
    }
    setMsTime(futureMsDate - now);
  }, [futureMsDate]);

  useEffect(() => {
    const now = new Date().getTime();
    if (now > futureMsDate) {
      setSemanticFormat("00:00");
      return;
    }
    // * set false to make accessable reaming time  ========= >
    setIsFnished(false);
    // * assigne msTime state it gets decreasement ================== >
    let reaminedTime = msTime;

    // * decrease reaminedTime once a second ============== >
    const reamingInterval = setInterval(() => {
      if (reaminedTime - 1000 <= 0) {
        setIsFnished(true);
        return;
      }
      // * Reaming 1 second =========== >
      reaminedTime = reaminedTime - 1000;
      // * trun ms format to an understandable format ======== >
      const _reaminedTime = semanticTime(reaminedTime);
      setSemanticFormat(_reaminedTime);
    }, 1000);

    // * Clean up ============== >
    return () => {
      clearInterval(reamingInterval);
    };
  }, [futureMsDate, msTime]);

  return { semanticFormat, isFnished };
}

export default useReamingTime;

function semanticTime(ms: number) {
  // * ms to seconds =============== >
  if (ms <= 60_000) {
    const seconds = Math.round(ms / 1000);
    return timeFormat(0, 0, seconds);
  }
  // * ms to minutes & seconds =============== >
  if (ms <= 3_600_000) {
    const minutes = Math.floor(ms / 60_000);
    const seconds = Math.round((ms % 60_000) / 1000);
    return timeFormat(0, minutes, seconds);
  }
  // * ms to houers & minutes & seconds =============== >
  else {
    const houers = Math.floor(ms / 3_600_000);

    const minFromHoure = ms % 3_600_000;
    const minutes = Math.floor(minFromHoure / 60_000);

    const secondFromMinute = minFromHoure % 60_000;
    const seconds = Math.round(secondFromMinute / 1000);

    return timeFormat(houers, minutes, seconds);
  }
}
interface TimeFormatOption {
  houre?: boolean;
}
function timeFormat(
  h: number,
  m: number,
  s: number,
  { houre = false }: TimeFormatOption = {}
) {
  if (!houre)
    return `${String(m).length == 1 ? "0" : ""}${m}:${
      String(s).length == 1 ? "0" : ""
    }${s}`;
  return `${String(h).length == 1 ? "0" : ""}${h}:${
    String(m).length == 1 ? "0" : ""
  }${m}:${String(s).length == 1 ? "0" : ""}${s}`;
}
