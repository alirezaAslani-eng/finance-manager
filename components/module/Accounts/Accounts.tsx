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
import { usePaginationArray } from "@/hooks";

const data = [1, 8, 8, 8, 6, 8, 8, 8]; // ! Fake data <<<<<<<<<<<
// TODO style => Responsive 
// TODO logic => get dynamic data 
function DesktopCards() {
  const theme = useTheme();
  const { pagedData } = usePaginationArray(data);

  return (
    <BoxWithTitle
      title="حساب های من"
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
      <Slider NavButton={NavigationButton}>
        {pagedData.map((item) => {
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
        })}
        {/* <NavButton /> */}
      </Slider>
    </BoxWithTitle>
  );
}

export default DesktopCards;


