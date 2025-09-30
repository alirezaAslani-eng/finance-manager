import { AccountCard, BoxWithTitle, MuiButton } from "@/components/ui";
import { Slider } from "@/components/module";
import { Box, useTheme } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import React from "react";
// Import Swiper React components
import { SwiperSlide, useSwiper } from "swiper/react";
import { NavigationButton } from "../Slider/Button";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import Link from "next/link";
import { useBreakePoints, usePaginationArray } from "@/hooks";

const data = [1, 8, 8, 8, 6, 8, 8, 8];
// TODO logic => get dynamic data
function DesktopCards() {
  const theme = useTheme();
  const { pagedData } = usePaginationArray(data);
  // * Responsive Hook ==================== >
  const { isTablet } = useBreakePoints({ decrease: 200 });

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
          {item.map((slide) => {
            return <AccountCard />;
          })}
        </Box>
      </SwiperSlide>
    );
  });
  // *  Before Desktop breake point it renders a simple list of accounts  =============== >
  const MobileContent = data.map((item) => {
    return (
      <SwiperSlide>
        <Box display={"flex"} justifyContent={"center"}>
          <AccountCard />
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
        <Slider NavButton={NavigationButton}>
          {isTablet ? DesktopContent : MobileContent}
          {/* <NavButton /> */}
        </Slider>
      </Box>
    </BoxWithTitle>
  );
}

export default DesktopCards;
