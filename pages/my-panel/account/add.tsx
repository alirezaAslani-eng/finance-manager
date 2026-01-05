import { AccountForm } from "@/components/module";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box, Container } from "@mui/material";
import React from "react";
import type { GlobalAppProps } from "@/types/pages/Global.types";
import { useAddccount, useEditAccount } from "@/hooks";
import { CreateAccountSchemaType } from "@/lib/validations/types";
import { getOneAccount } from "@/server/services";
import { getServerSidePropsWithAuth } from "@/server/HOFs";
import type { GetServerSidePropsWithAuth } from "@/types/ssr.types";
import { toSerializable } from "@/lib/utils";

interface PageProps {
  isEdit: boolean;
  accountInfo?: CreateAccountSchemaType;
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

const ssr: GetServerSidePropsWithAuth<GlobalAppProps & PageProps> = async (
  context
) => {
  const { query } = context;
  // * if page render to edit account pass it's info ================= >
  if (query.edit) {
    const accountInfo = await getOneAccount(query.edit as string);

    // * redirect user if account's id dos not exist
    if (!accountInfo) return { notFound: true };

    // * Render ============ >
    return {
      props: {
        isEdit: true,
        accountInfo: toSerializable(accountInfo),
        accountId: query.edit as string,
      },
    };
  }
  // * if page render to add an account  ================= >
  return { props: { isEdit: false } };
};

export const getServerSideProps = getServerSidePropsWithAuth(ssr);
