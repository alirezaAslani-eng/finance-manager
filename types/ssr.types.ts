import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { GetMeOutput } from "./user.types";

interface EtendedProps {
  user: GetMeOutput;
}
type WrappedGetserverSideProps<P extends object = {}> = (
  context: GetServerSidePropsContext,
  extraProps: EtendedProps
) => Promise<GetServerSidePropsResult<P>>;

export type { WrappedGetserverSideProps };
