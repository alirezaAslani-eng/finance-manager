/**
 * This method needs to take a time from future as (ms) and it return a text that tells users how mush they need to wait
 *
 */
const getReamingTime = (futureMs: number): `${number} ${string}` => {
  const now = new Date().getTime();
  const ms = futureMs - now;

  let time = 0; // time containes a number can be seconds, hourse, or minutes .
  let unit: "سانیه" | "دقیقه" | "ساعت" = "سانیه";
  if (now >= futureMs) {
    time = 0;
    unit = "سانیه";
  }
  if (ms <= 60000) {
    unit = "سانیه";
    time = Math.ceil(ms / 1000);
  } else if (ms <= 3600000) {
    unit = "دقیقه";
    time = Math.round(ms / 60000);
  } else {
    unit = "ساعت";
    time = Math.round(ms / 3600000);
  }
  return `${time} ${unit}`;
};

export default getReamingTime;
