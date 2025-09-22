import React from "react";

interface Config {
  per?: number;
}
function usePaginationArray<T>(data: T[], options: Config | undefined = {}) {
  const { per = 4 } = options;
  let start = 0;
  let end = per;
  const pagedData: T[][] = [];
  Array.from({ length: Math.ceil(data.length / 4) }, () => {
    const slide = data.slice(start, end).map((item) => item);
    pagedData.push(slide);
    start = end;
    end += 4;
  });

  return { pagedData };
}

export default usePaginationArray;
