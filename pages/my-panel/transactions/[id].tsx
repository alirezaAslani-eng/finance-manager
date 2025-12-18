import React from "react";
import { Typography, useTheme, Grid, Container } from "@mui/material";
import { PageComponent } from "@/types/page.types";
import { PanelLayout } from "@/layout";
import { TransactionDetalCard } from "@/components/ui";
import { muiTheme } from "@/utils";
import { EditTransactionform } from "@/components/module";
import type { GlobalAppProps } from "@/types/pages/Global.types";
import type { TransactionInfoPageProps } from "@/types/pages/transactionInfoPage.types";
import type { WrappedGetserverSideProps } from "@/types/ssr.types";
import { withAuth } from "@/lib/hoc";
import { transactionServices } from "@/lib/services";
import { toSerializable } from "@/lib/utils";
import { check_id, checkOwnerOf } from "@/server/utils";
import { transaction_model } from "@/model";
import { useDate, useEditTransaction } from "@/hooks";

const TransactionDetails: PageComponent<TransactionInfoPageProps> = ({
  isEditable,
  transactionInfo,
}) => {
  const { palette } = useTheme();

  // * transaction Info from SSR ================= >
  const {
    _id,
    account,
    accountBalance,
    amount,
    category,
    createdAt,
    reason,
    type,
    isLatest,
  } = transactionInfo;

  // * get date of transaction ===== >
  const { date, time } = useDate(new Date(createdAt ?? ""));

  // * edit transaction hook ==== >>
  const { editTransaction } = useEditTransaction(_id);

  return (
    <Container sx={{ py: "30px" }}>
      {isEditable ? (
        // * Edit Transaction's info ================ >
        <EditTransactionform
          onSubmit={editTransaction}
          isLatestTransaction={isLatest}
          defaultValues={{
            category: category._id,
            reason,
            amount,
            type,
          }}
        />
      ) : (
        // * Show Transaction's info ===================== >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* //* Important Details ================ > */}
            <TransactionDetalCard
              _id={_id}
              amount={amount}
              balance={accountBalance}
              type={type == "0" ? "expense" : "income"}
              accountNumber={account.cardNumber}
              date={date}
              houre={time}
            />
          </Grid>
          {/* Description ===================== >*/}
          <Grid size={{ xs: 12, lg: 8 }}>
            {/* Category ================= > */}
            <Typography
              variant="h1"
              sx={{
                fontSize: "34px",
                color: muiTheme(palette.mode, {
                  light: palette.grey[800],
                  dark: palette.grey[100],
                }),
              }}
            >
              {category.name}
            </Typography>
            {/* Description ================== > */}
            <Typography
              sx={{
                fontSize: "18px",
                mt: "10px",
                color: muiTheme(palette.mode, {
                  light: palette.grey[700],
                  dark: palette.grey[200],
                }),
              }}
            >
              {reason}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

TransactionDetails.Layout = PanelLayout;
export default TransactionDetails;

const ssr: WrappedGetserverSideProps<
  GlobalAppProps & TransactionInfoPageProps
> = async (context, { user }) => {
  const { query, params } = context;

  // * dynamic id =============== >
  const _id = params?.id as string;

  // * check _id ============== >
  const isValid_id = await check_id({ _id, model: transaction_model });
  if (!isValid_id) return { notFound: true }; // ! redirect 404 <<<

  // * Services ====================== >
  const { getOneTransaction } = transactionServices;

  // * user must be owner of this info ============= >
  const isAccessTo = await checkOwnerOf(
    {
      modelID: _id,
      mustBeOwnerOf: transaction_model,
      userId: user._id,
    },
    { autoError: false }
  );
  if (!isAccessTo) return { notFound: true }; // ! redirect 404 <<<

  // * get info of transaction ================== >
  const info = await getOneTransaction(params?.id as string);

  return {
    props: {
      isEditable: query.edit === "true",
      transactionInfo: toSerializable(info!),
      ssrUserInfo: user,
    },
  };
};

export const getServerSideProps = withAuth(ssr, {
  checkHasAccount: false,
});
