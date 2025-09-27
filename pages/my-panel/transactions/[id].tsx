import React, { useEffect, useState } from "react";
import { Typography, Box, useTheme, Grid, Container } from "@mui/material";
import { PageComponent } from "@/types/page.types";
import { PanelLayout } from "@/layout";
import { AccountCard, TransactionDetalCard } from "@/components/ui";
import { muiTheme } from "@/utils";
import { useRouter } from "next/router";
import { TransactionForm } from "@/components/module";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { GlobalAppProps } from "@/pages/_app";

interface PageProps {
  // * is content editable or readonly ================= >
  isEditable: boolean;
}
const TransactionDetails: PageComponent<PageProps> = ({ isEditable }) => {
  const { palette } = useTheme();

  return (
    <Container sx={{ pt: "30px" }}>
      {isEditable ? (
        <TransactionForm />
      ) : (
        <Grid container spacing={2}>
          <Grid size={4}>
            {/* Important Details ================ > */}
            <TransactionDetalCard />
            {/* Accout Card ========================== > */}
            <Box sx={{ mt: "20px" }}>
              <Typography variant="h1" sx={{ fontSize: "26px", mb: "20px" }}>
                {"از حساب : "}
              </Typography>
              <AccountCard onlyInfo />
            </Box>
          </Grid>
          {/* Description ===================== >*/}
          <Grid size={8}>
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
              {"متن دسته بندی"}
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
              {`این افسانه‌ی ژاپنی به زیبایی مفهوم «پایداری در چرخه‌ی تغییرات» را نشان می‌دهد. در فرهنگ‌های شرقی، طبیعت اغلب آینه‌ای برای درک زندگی است؛ درست مانند درخت که با هر برگ‌ریزان، نه پایان که نوید تولدی دوباره را می‌دهد. این یادآور می‌شود که هر کاهشی، بستر رشد تازه‌ای است و امید همواره در پس هر تحولی جای دارد.`}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

TransactionDetails.Layout = PanelLayout;
export default TransactionDetails;

export const getServerSideProps: GetServerSideProps<
  GlobalAppProps & PageProps
> = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  return {
    props: { isEditable: query.edit === "true" },
  };
};
