import { ShadowScrollContainer } from "@/components/ui";
import { useModal } from "@/context";
import { useTriggerState } from "@/hooks";
import {
  AddCircleOutline,
  AddRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { Box, Button, Container, Grid } from "@mui/material";
import Link from "next/link";
import BottomNavigationButton from "./internal-components/BottomNavigationButton";
import BottomNavigationText from "./internal-components/BottomNavigationText";
import Navigators from "./internal-components/Navigators";

function BottomNavigationPanel() {
  const [isMoreOption, moreOption, lessOption] = useTriggerState(false);
  const { openAddCategoryModal } = useModal();

  return (
    <Container
      sx={{
        position: "sticky",
        bottom: "-1px",
        left: 0,
        zIndex: 5,
      }}
    >
      <ShadowScrollContainer
        bgcolor={"background.paper"}
        borderRadius={"24px 24px 0px 0px"}
        mt={"23px"}
        sx={({ palette, alpha }) => {
          return {
            boxShadow: `0px -5px 20px 0px ${alpha(palette.black, 0.1)} `,
          };
        }}
      >
        {/* // * start-------- navigators -------------- */}
        <ShadowScrollContainer.Scroll
          overflow={isMoreOption ? "auto" : "hidden"}
          width={"100%"}
          height={isMoreOption ? "200px" : "64px"}
          sx={(tm) => ({
            transition: "all ease 300ms",
            ...(tm.custom!.noScroll as object),
          })}
        >
          <Grid
            container
            spacing={2}
            rowGap={"20px"}
            p={{ xs: "8px 8px 32px 8px", _340: "14px 8px 32px 8px" }}
          >
            <Grid size={3}>
              <BottomNavigationButton
                onClick={isMoreOption ? lessOption : moreOption}
              >
                {isMoreOption ? (
                  <KeyboardArrowDownRounded color="inherit" />
                ) : (
                  <KeyboardArrowUpRounded color="inherit" />
                )}

                <BottomNavigationText>
                  {isMoreOption ? "کمتر" : "بیشتر"}
                </BottomNavigationText>
              </BottomNavigationButton>
            </Grid>

            <Grid size={3}>
              <BottomNavigationButton onClick={openAddCategoryModal}>
                <AddCircleOutline color="inherit" />
                <BottomNavigationText>{"دسته بندی"}</BottomNavigationText>
              </BottomNavigationButton>
            </Grid>
            <Navigators onNavigate={lessOption} />
          </Grid>
        </ShadowScrollContainer.Scroll>
        {/* // * end-------- navigators -------------- */}

        {isMoreOption && <ShadowScrollContainer.Shadow position="bottom" />}

        {/* // * start-------- add-transaction-button -------------- */}
        <Box
          position="absolute"
          left="50%"
          top="0px"
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          <Link href={"/my-panel/transactions/add"}>
            <Button
              variant="contained"
              size="large"
              sx={(tm) => ({ ...(tm.custom!.circleButton as object) })}
            >
              <AddRounded />
            </Button>
          </Link>
        </Box>
        {/* // * end-------- add-transaction-button -------------- */}
      </ShadowScrollContainer>
    </Container>
  );
}

export default BottomNavigationPanel;
