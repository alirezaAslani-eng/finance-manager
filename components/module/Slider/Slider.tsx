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
  children: ChildrenType;}

const Slider = ({ children }: myProps) => {
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
      </Swiper>
    </>
  );
};

export default Slider;
