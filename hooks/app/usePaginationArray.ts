import React, { useEffect } from "react";

interface Config {
  per?: number;
}
function usePaginationArray<T>(data: T[], options: Config = {}) {
  const { per = 4 } = options;

  const pagedData: T[][] = []; // * Final Result <<<
  let start = 0;
  let end = per;
  const pageCount = data.length / per;
  Array.from({ length: Math.ceil(pageCount) }, () => {
    
    const slide = data.slice(start, end).map((item) => item); // ! Might be Heavy <<
    pagedData.push(slide);
    start = end;
    end += 4;
  });

  return { pagedData };
}

export default usePaginationArray;
