import { MuiButton } from "@/components/ui";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import React from "react";
import { useSwiper } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
// * Left Arrow ============ >
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
// * Right Arrow ============== >
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

interface myProps {
  instance: SwiperType;
}

function NavigationButton({ instance }: myProps) {
  const theme = useTheme();
  const nextSlide = () => {
    instance.slideNext();
  };
  const prevSlide = () => {
    instance.slidePrev();
  };
  const button_style = {
    ...theme.custom.resetButton,
    p: "10px",
    borderRadius: "999px",
    backgroundColor: theme.alpha(theme.palette.primary.main, 0.8),
    position: "absolute",
    top: "50%",
    translate: "0 -50%",
    zIndex: "2",
  };
  return (
    <>
      <MuiButton
        buttonProps={{
          sx: {
            ...button_style,
            right: "0",
          },
          onClick: prevSlide,
        }}
      >
        <ArrowCircleRightRoundedIcon />
      </MuiButton>
      <MuiButton
        buttonProps={{
          onClick: nextSlide,
          sx: {
            ...button_style,
            left: "0",
          },
        }}
      >
        <ArrowCircleLeftRoundedIcon />
      </MuiButton>
    </>
  );
}

export default NavigationButton;
