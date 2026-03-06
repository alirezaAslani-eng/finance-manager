import { RecentTransactions } from "@/components/module";
import { PageComponent } from "@/types/page.types";
import { Box, BoxProps, Container, useMediaQuery } from "@mui/material";
import { PanelLayout } from "@/layout";
import { getServerSidePropsWithAuth } from "@/server/HOFs";
import {
  BoxWithHeading,
  IncomeExpenseCard,
  TotalBalanceCard,
} from "@/components/ui";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";
import type { GetServerSidePropsWithAuth } from "@/types/ssr.types";
import type { GlobalAppProps } from "@/pages/_app";
const index: PageComponent = () => {
  const isAftersm = useMediaQuery(({ breakpoints }) => breakpoints.up("sm"));
  return (
    // * =============== Container ===============
    <Container>
      <Box
        display={"flex"}
        gap={"50px"}
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "center", lg: "start" },
        }}
      >
        <Box component={"section"} width={"min(400px,100%)"}>
          {/* // * =========== TotalBalanceCard  =============*/}
          <TotalBalanceCard>
            <TotalBalanceCard.BalanceSection
              fontSize={{ xs: "16px", sm: "24px" }}
            >
              <TotalBalanceCard.BalanceText>
                {"کل دارایی"}
              </TotalBalanceCard.BalanceText>
              <TotalBalanceCard.BalanceNumber />
            </TotalBalanceCard.BalanceSection>

            <TotalBalanceCard.AccountSection>
              <TotalBalanceCard.AccountIconList />
              <TotalBalanceCard.TriggerAccountListButton
                size={isAftersm ? "medium" : "small"}
              >
                {"مدریت حساب ها"}
              </TotalBalanceCard.TriggerAccountListButton>
            </TotalBalanceCard.AccountSection>
          </TotalBalanceCard>

          {/* // * =========== IncomeExpense  =============*/}
          <IncomeExpenseCard mt={"24px"}>
            <IncomeExpenseCard.Title fontSize={{ xs: "20px", sm: "24px" }}>
              {"بیشترین سود و زیان این ماه"}
            </IncomeExpenseCard.Title>

            <IncomeExpenseCard.IncomeExpenseSection>
              <IncomeExpenseCard.IncomeCategory />
              <IncomeExpenseCard.ExpenseCategory />
            </IncomeExpenseCard.IncomeExpenseSection>

            <Box mt={"24px"}>
              <IncomeExpenseCard.MoreDetailsButton>
                {"مشاهده"}
              </IncomeExpenseCard.MoreDetailsButton>
            </Box>
          </IncomeExpenseCard>
        </Box>

        {/* // * =============== RecentTransactions =============== */}
        <Box component={"section"} flex={"1"} minWidth={"0px"} width={"100%"}>
          <BoxWithHeading>
            <BoxWithHeading.Heading>
              <BoxWithHeading.TitleHeading>
                {"تراکنش های اخیر"}
              </BoxWithHeading.TitleHeading>
              <BoxWithHeading.ButtonHeading>
                {"همه تراکنش ها"}
                <CallReceivedRoundedIcon sx={{ transform: "rotate(90deg)" }} />
              </BoxWithHeading.ButtonHeading>
            </BoxWithHeading.Heading>
            <BoxWithHeading.Content>
              <RecentTransactions />
            </BoxWithHeading.Content>
          </BoxWithHeading>
        </Box>
      </Box>
    </Container>
  );
};

index.Layout = PanelLayout;

export default index;

const ssr: GetServerSidePropsWithAuth<GlobalAppProps> = async () => {
  // todo -> ssr must prefetch recentTransaction query and dehydrate the queryClient
  return {
    props: {},
  };
};

export const getServerSideProps = getServerSidePropsWithAuth(ssr);
