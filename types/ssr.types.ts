import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { GetMeOutput } from "./user.types";

interface ExtendedProps {
  user: GetMeOutput;
}
type WrappedGetserverSideProps<P extends object = {}> = (
  context: GetServerSidePropsContext,
  extraProps: ExtendedProps
) => Promise<GetServerSidePropsResult<P>>;

export type { WrappedGetserverSideProps };
