import React from "react";

type OutputType = number[] | string[];

interface InputType {
  query: string;
  parser?: typeof Number | typeof String;
  splitSign?: string;
}

interface StringPareser extends Pick<InputType, "query" | "splitSign"> {
  parser?: typeof String;
}
interface NumberParser extends Pick<InputType, "query" | "splitSign"> {
  parser?: typeof Number;
}
function parseAQueryToArray(input: StringPareser): string[];
function parseAQueryToArray(input: NumberParser): number[];

/**
 * passe a query's value with this format -> "a,b,c,d" then it parse it into an array -> ["a","b","c"]
 */
function parseAQueryToArray({
  query,
  parser = String,
  splitSign = ",",
}: InputType): OutputType {
  const parseToArray = (): string[] => {
    return query?.length
      ? query.split(splitSign).filter((val) => val.length)
      : [];
  };
  switch (parser) {
    case Number: {
      return parseToArray().map((val) => Number(val));
    }
    case String: {
      return parseToArray();
    }
    default: {
      return parseToArray();
    }
  }
}

export default parseAQueryToArray;
