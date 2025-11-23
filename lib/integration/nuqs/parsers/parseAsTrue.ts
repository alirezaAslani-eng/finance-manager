import { createParser } from "nuqs";

/**
 * A nuqs parser that lets you only set true or null to remove the query from URL
 */
const parseAsTrue = createParser<null | true>({
  parse: (q) => (q === "true" ? true : null),
  serialize: (value) => (value === true ? "true" : ""),
});

export default parseAsTrue;
