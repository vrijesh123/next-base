import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
("swiper");
import Heading from "../common/Heading";

const AboutUs = () => {
  const language = [
    "Hi, I’m Dr. Guinwa Khaddaj, a multilingual Gastroenterologist, Hepatologist, and Endoscopist.",
    "Hola, soy la Dra. Guinwa Khaddaj, gastroenteróloga, hepatóloga y endoscopista multilingüe.",
    "مرحبًا، أنا الدكتورة جينوى حداد، أخصائية أمراض الجهاز الهضمي والكبد والمناظير وأتحدث عدة لغات.",
  ];
  return (
    <section>
      <div className="container">
        <Heading
          name={"About Me"}
          title={
            "Dedicated to Your Digestive Wellness with Expertise and Compassion."
          }
        />

        <div className="about-us-container">
          <div className="content">
            <p>
              Welcome to the world of gastrointestinal health with Dr. Guinwa
              Khaddaj. With extensive experience in both elective and emergency
              cases, she is dedicated to providing compassionate, personalized
              care. Using the latest breakthroughs in gastroenterology and
              advanced diagnostic techniques, Dr. Guinwa ensures accurate
              diagnosis and minimally invasive treatments, guiding you on your
              journey to wellness with professionalism, warmth, and empathy.
            </p>

            <div className="counts">
              <div className="count">
                <span>15+</span>
                <p>Years of Experience</p>
              </div>
              <div className="count center">
                <span>250+</span>
                <p>Number of endoscopies</p>
              </div>
              <div className="count">
                <span>50+</span>
                <p>Number of Colonoscopies</p>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="img-container">
              <img src="/images/about-us.png" alt="About Us" />
            </div>

            <div className="lang">
              <div className="lang-content">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    el: ".swiper-pagination",
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                >
                  {language?.map((lang) => (
                    <SwiperSlide>
                      <p>{lang}</p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="languages">
                <h6>Languages Spoken</h6>
                <p>🇺🇸 English &nbsp; 🇪🇸 Spanish &nbsp; 🇦🇪 Arabic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
