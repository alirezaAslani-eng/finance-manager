import { AccountForm } from "@/components/module";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box, Container } from "@mui/material";
import React from "react";
import type { GlobalAppProps } from "@/types/pages/Global.types";
import type { GetServerSidePropsContext } from "next";
import { useAddccount, useEditAccount } from "@/hooks";
import { AccountSchemaType } from "@/lib/validations/accountSchema";
import { accountServices } from "@/lib/services";
import { withAuth } from "@/lib/hoc";
import { WrappedGetserverSideProps } from "@/types/ssr.types";
import { toSerializable } from "@/lib/utils";
import { redirect } from "@/server/utils";

interface PageProps {
  isEdit: boolean;
  accountInfo?: AccountSchemaType;
  accountId?: string;
}

const add: PageComponent<PageProps> = ({ isEdit, accountInfo, accountId }) => {
  const { addAccount } = useAddccount();
  const { editAccount } = useEditAccount(accountId as string);

  return (
    <Container>
      {isEdit ? (
        <AccountForm
          onSubmit={editAccount}
          edit={true}
          defaultValues={accountInfo}
        />
      ) : (
        <Box>
          <AccountForm onSubmit={addAccount} />
        </Box>
      )}
    </Container>
  );
};

add.Layout = PanelLayout;
export default add;

const ssr: WrappedGetserverSideProps<GlobalAppProps | PageProps> = async (
  context: GetServerSidePropsContext,
  { user }
) => {
  const { query } = context;
  const { getOneAccount } = accountServices;
  // * if page render to edit account pass it's info ================= >
  if (query.edit) {
    const accountInfo = await getOneAccount(query.edit);

    // * redirect user if account's id dos not exist
    const isValidAccount = redirect(!accountInfo, { destination: "/404" }); // ! redirect <<<
    if (isValidAccount) return isValidAccount;

    // * Render ============ >
    return {
      props: {
        isEdit: true,
        accountInfo: toSerializable(accountInfo!),
        ssrUserInfo: user,
        accountId: query.edit,
      },
    };
  }
  // * if page render to add an account  ================= >
  return { props: { isEdit: false } };
};

export const getServerSideProps = withAuth(ssr);
