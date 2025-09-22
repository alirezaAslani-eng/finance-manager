import { NavigationButton } from "./Button";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { SwiperProps } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

type ChildrenType = SwiperProps["children"];
interface myProps {
  children: ChildrenType;
  NavButton?: React.FC<{ instance: SwiperType }>;
}

const Slider = ({ children, NavButton = NavigationButton }: myProps) => {
  const [instance, setInstance] = useState<SwiperType | null>(null);

  return (
    <>
      <Swiper
        // * Set instanse
        onSwiper={setInstance}
        modules={[Navigation]}
        spaceBetween={"20"}
        className="mySwiper"
      >
        {children}
        <NavButton instance={instance as SwiperType} />
      </Swiper>
    </>
  );
};

export default Slider;
