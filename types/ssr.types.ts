import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { GetMeOutput, PayloadToken_type } from "./user.types";

interface WithAuthExtraProps {
  tokenPayload: PayloadToken_type;
}
type GetServerSidePropsWithAuth<P extends object = any> = (
  context: GetServerSidePropsContext,
  props: WithAuthExtraProps
) => Promise<GetServerSidePropsResult<P>>;

export type { GetServerSidePropsWithAuth };
