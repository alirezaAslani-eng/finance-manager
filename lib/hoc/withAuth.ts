import { GlobalAppProps } from "@/pages/_app";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { accountServices, userServices } from "../services";
import { toSerializable } from "@/lib/utils";
import { GetMeOutput } from "@/types/user.types";
import { WrappedGetserverSideProps } from "@/types/ssr.types";

interface Options {
  checkHasAccount?: boolean;
}

const withAuth = (
  ssr: WrappedGetserverSideProps,
  opt: Options = {}
): GetServerSideProps => {
  // * Options ================ >
  const { checkHasAccount = true } = opt;
  const wrraped: GetServerSideProps<GlobalAppProps> = async (
    context: GetServerSidePropsContext
  ) => {
    const { req } = context;

    // * Services ================ >>
    const { getUserInfo } = userServices;
    const { hasAccount } = accountServices;

    // * Auth User redirect or return userInfo ================= >
    const userInfo = (await getUserInfo(req.cookies.token)) as GetMeOutput;

    // ! redirect to signin page
    if (!!!userInfo)
      return { redirect: { destination: "/auth/signin", permanent: false } };

    // * Dose User have Account (optional) ============== >
    if (checkHasAccount) {
      const userHasAccount = await hasAccount(userInfo._id);
      // ! redirect to init page
      if (!userHasAccount)
        return {
          redirect: { destination: "/my-panel/init", permanent: false },
        };
    }
    return ssr(context, { user: toSerializable(userInfo) });
  };
  return wrraped;
};

export default withAuth;
