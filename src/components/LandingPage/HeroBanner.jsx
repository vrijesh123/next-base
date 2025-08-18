import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
("swiper");
import gsap from "gsap";

const slides = [
  {
    id: 1,
    image: "/images/banner-1.webp",
    heading: "Best Gastroenterologist for Your Digestive Health",
    description:
      "Expert care for digestive disorders, liver health, and endoscopic procedures to help you feel your best.",
  },
  {
    id: 2,
    image: "/images/banner-2.webp",
    heading: "Comprehensive Liver Health Treatments",
    description:
      "Our advanced diagnostics and compassionate care ensure your liver health is in good hands.",
  },
  {
    id: 3,
    image: "/images/banner-3.webp",
    heading: "Leading Female Gastroenterologist for Expert Digestive Care",
    description:
      "Get accurate results and quick recovery with our expert-led endoscopic services.",
  },
];

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;

      // Image Fade Transition
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          setActiveIndex(nextIndex);
          gsap.fromTo(
            imageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
          );
        },
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const { image } = slides[activeIndex];

  return (
    <section className="container" style={{ marginTop: "10px" }}>
      <div className="banner-container">
        <div className="banner-image" ref={imageRef}>
          <img src={image} alt="Hero Banner" />
        </div>

        <div className="banner-content">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              type: "bullets",
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {slides?.map((banner) => (
              <SwiperSlide>
                <div className="content">
                  <h1>{banner?.heading}</h1>

                  <p
                    dangerouslySetInnerHTML={{ __html: banner?.description }}
                  />

                  <button onClick={() => {}} className="white-cta">
                    Book An Appointment
                    <div className="icon-container">
                      <img src="/icons/stethoscope.svg" />
                    </div>
                  </button>
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-pagination" />
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
