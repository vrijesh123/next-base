import React from "react";
import HeroBanner from "./HeroBanner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AboutUs from "./AboutUs";

const LandingPage = () => {
  return (
    <>
      <HeroBanner />

      <AboutUs />
    </>
  );
};

export default LandingPage;
