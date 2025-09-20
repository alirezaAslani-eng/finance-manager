import { NextPage } from "next";
import { PropsWithChildren, ReactNode } from "react";
// * Add custom prop to each Next component  ==================== >
interface CustomPageProps {
  // * a Layout Functional component ============== >
  Layout?: ({ children }: PropsWithChildren) => ReactNode;
}
// * Page Type ====================== >
type PageComponent<P = {}, IP = P> = NextPage<P, IP> & CustomPageProps;

export type { PageComponent, CustomPageProps };
