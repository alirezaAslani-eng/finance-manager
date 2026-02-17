import { JSX } from "react";

/**
 * pick attributes of <option> element
 */
type PickOptionElementAttributes<
  WhichAttribute extends keyof JSX.IntrinsicElements["option"],
> = Required<Pick<JSX.IntrinsicElements["option"], WhichAttribute>>;

export type { PickOptionElementAttributes };

