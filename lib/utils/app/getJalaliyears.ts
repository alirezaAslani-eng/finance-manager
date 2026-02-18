import buildArray from "./buildArray";
import faNumToEnNum from "./faNumtoEnNum";

export default function getJalaliyears(from: number): number[] {
  const until = Number(
    faNumToEnNum(new Date().toLocaleString("fa-IR").split("/")[0]),
  );
  if (from === until) return [from];
  let fromYear = from;

  const years = buildArray(until - from + 1, (index: number) => {
    const eachYear = (fromYear += index === 0 ? 0 : 1);
    return eachYear;
  });
  return years;
}
