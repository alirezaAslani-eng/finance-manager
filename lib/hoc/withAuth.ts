import { GlobalAppProps } from "@/pages/_app";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { GetServerSidePropsWithAuth } from "@/types/ssr.types";
import { verifyUserToken } from "@/server/utils";

const withAuth = (ssr: GetServerSidePropsWithAuth): GetServerSideProps => {
  const wrraped: GetServerSideProps<GlobalAppProps> = async (
    context: GetServerSidePropsContext
  ) => {
    const { req } = context;

    // * Verify User's Token ================= >
    const tokenPayload = verifyUserToken(req.cookies.token);

    if (!!!tokenPayload)
      // ! redirect to signin page
      return { redirect: { destination: "/auth/signin", permanent: false } };

    return ssr(context, { tokenPayload });
  };
  return wrraped;
};

export default withAuth;
