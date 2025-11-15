import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AboutUs from "./AboutUs";
import Faqs from "../common/Faqs/Faqs";
import Blogs from "./Blogs";
import StickyCards from "./StickyCards";

const LandingPage = () => {
  return (
    <>
      <AboutUs />

      <StickyCards />

      <Faqs />

      <Blogs />
    </>
  );
};

export default LandingPage;
