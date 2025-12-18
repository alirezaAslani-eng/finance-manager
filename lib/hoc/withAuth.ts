import { GlobalAppProps } from "@/pages/_app";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { accountServices, userServices } from "../services";
import { checkOwnerOf, toSerializable, redirect } from "../utils";
import { GetMeOutput } from "@/types/user.types";
import { WrappedGetserverSideProps } from "@/types/ssr.types";
import type { Model } from "mongoose";

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
    const isAuth = redirect(!!!userInfo, { destination: "/auth/signin" });
    if (isAuth) return isAuth;

    // * Dose User have Account (optional) ============== >
    if (checkHasAccount) {
      const userHasAccount = await hasAccount(userInfo._id);
      const has = redirect(!!!userHasAccount, {
        destination: "/my-panel/init",
      }); // ! redirect to init page
      if (has) return has;
    }

    return ssr(context, { user: toSerializable(userInfo) });
  };
  return wrraped;
};

export default withAuth;
