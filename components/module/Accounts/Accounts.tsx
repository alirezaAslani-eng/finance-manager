import { AccountCard, BoxWithTitle } from "@/components/ui";
import { Slider } from "@/components/module";
import { Box, Button } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import React, { useMemo } from "react";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import Link from "next/link";
import { useActiveAccount, useBreakePoints, usePaginationArray } from "@/hooks";
import { GetMeOutput } from "@/types/user.types";


interface MyProps extends Pick<GetMeOutput, "accounts"> {}
function Accounts({ accounts = [] }: MyProps) {
  // * Paged 4 item per a slide ===================== >
  const { pagedData } = usePaginationArray(accounts);

  // * Responsive Hook ==================== >
  const { isTablet } = useBreakePoints({ decrease: 200 });

  // * Enable Account Hook ====================== >
  const { activeAccount } = useActiveAccount();

  // * Enable Handler ================= >
  const enableHandler = (_id: string) => {
    activeAccount({ _id });
  };

  // *  After Mobile breake point it renders a grid structure  =============== >
  const DesktopContent = useMemo(
    () =>
      pagedData.map((item) => {
        return (
          <SwiperSlide>
            <Box
              display={"grid"}
              sx={{
                gridTemplateColumns: "repeat(2,1fr)",
                mt: "20px",
                gap: "20px",
              }}
            >
              {item.map((account) => {
                return (
                  <AccountCard
                    onEnable={enableHandler}
                    _id={account._id}
                    isActive={account.isActive}
                    key={crypto.randomUUID()}
                    accountName={account.accountName}
                    cardNumber={account.cardNumber}
                    currentBalance={account.currentBalance}
                  />
                );
              })}
            </Box>
          </SwiperSlide>
        );
      }),
    [pagedData, accounts]
  );
  // *  Before Desktop breake point it renders a simple list of accounts  =============== >
  const MobileContent = useMemo(() => {
    return accounts.map((account) => {
      return (
        <SwiperSlide>
          <Box display={"flex"} justifyContent={"center"}>
            <AccountCard
              onEnable={enableHandler}
              _id={account._id}
              isActive={account.isActive}
              key={crypto.randomUUID()}
              accountName={account.accountName}
              cardNumber={account.cardNumber}
              currentBalance={account.currentBalance}
            />
          </Box>
        </SwiperSlide>
      );
    });
  }, [accounts]);

  return (
    <BoxWithTitle
      title="حساب های من"
      boxProps={{ sx: { backgroundColor: "transparent" } }}
      Button={
        <Link href="">
          <Button
            size="medium"
            variant="outlined"
            sx={({ custom }) => {
              return {
                ...(custom.circleButton as object),
                gap: "5px",
              };
            }}
          >
            <AddCircleOutlineRoundedIcon />
          </Button>
        </Link>
      }
    >
      {/* //* Slider Container ===================== > */}
      <Box
        sx={{
          maxWidth: {
            xs: "400px",
            _700: "100%",
          },
          mx: "auto",
          mt: "20px",
        }}
      >
        <Slider>
          {isTablet ? DesktopContent : MobileContent}
          {/* <NavButton /> */}
        </Slider>
      </Box>
    </BoxWithTitle>
  );
}

export default React.memo(Accounts);
