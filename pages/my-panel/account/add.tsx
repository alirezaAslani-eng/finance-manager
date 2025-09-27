import { AccountForm } from "@/components/module";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import type { GlobalAppProps } from "@/pages/_app";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

interface PageProps {
  isEdit: boolean;
}

const add: PageComponent<PageProps> = ({ isEdit }) => {
  return (
    <Container>
      <AccountForm edit={isEdit} />
    </Container>
  );
};

add.Layout = PanelLayout;
export default add;

export const getServerSideProps: GetServerSideProps<
  GlobalAppProps & PageProps
> = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  return { props: { isEdit: !!query.edit } };
};
