import { ParamType } from "@/types/utils";
import type { Collapse, Fade, Grow, Slide } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement } from "react";

const SlotTransition = function <
  TComponent extends
    | typeof Slide
    | typeof Grow
    | typeof Collapse
    | typeof Fade = typeof Slide,
>(Component: TComponent, options?: Omit<ParamType<TComponent>, "children">) {
  const Transition = forwardRef(function (
    transitionProps: TransitionProps & { children: ReactElement<unknown> },
    ref,
  ) {
    //@ts-ignore
    return <Component ref={ref} {...(options ?? {})} {...transitionProps} />;
  });
  return Transition;
};
export default SlotTransition;
