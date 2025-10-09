import { AccountCard, BoxWithTitle, MuiButton } from "@/components/ui";
import { Slider } from "@/components/module";
import { Box, useTheme } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import React, { useContext } from "react";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import Link from "next/link";
import { useBreakePoints, usePaginationArray } from "@/hooks";
import { GetMeOutput } from "@/types/user.types";

const data = [1, 8, 8, 8, 6, 8, 8, 8];

interface MyProps extends Pick<GetMeOutput, "accounts"> {}
function Accounts({ accounts = [] }: MyProps) {
  // * Paged 4 item per a slide ===================== >
  const { pagedData } = usePaginationArray(accounts);

  // * Responsive Hook ==================== >
  const { isTablet } = useBreakePoints({ decrease: 200 });

  // * Style ============ >
  const theme = useTheme();

  // *  After Mobile breake point it renders a grid structure  =============== >
  const DesktopContent = pagedData.map((item) => {
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
  });
  // *  Before Desktop breake point it renders a simple list of accounts  =============== >
  const MobileContent = accounts.map((account) => {
    return (
      <SwiperSlide>
        <Box display={"flex"} justifyContent={"center"}>
          <AccountCard
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

  return (
    <BoxWithTitle
      title="حساب های من"
      boxProps={{ sx: { backgroundColor: "transparent" } }}
      Button={
        <Link href="">
          <MuiButton
            buttonProps={{
              sx: {
                display: "flex",
                alignItems: "center",
                gap: "5px",
                ...theme.custom.resetButton,
                p: "10px",
                borderRadius: "999px",
              },
            }}
          >
            <AddCircleOutlineRoundedIcon />
          </MuiButton>
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

export default Accounts;
