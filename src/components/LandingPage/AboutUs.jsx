import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
("swiper");
import Heading from "../common/Heading";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const AboutUs = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once
    threshold: 0.1, // Percentage of the component visible to trigger the animation
  });

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

            <div className="counts" ref={ref}>
              <div className="count">
                {inView && !hasAnimated && (
                  <CountUp
                    start={0}
                    end={15}
                    duration={3}
                    onEnd={() => setHasAnimated(true)}
                  />
                )}
                {!inView || (hasAnimated && <span>15+</span>)}
                <p>Years of Experience</p>
              </div>
              <div className="count center">
                {inView && !hasAnimated && (
                  <CountUp
                    start={0}
                    end={250}
                    duration={3}
                    onEnd={() => setHasAnimated(true)}
                  />
                )}
                {!inView || (hasAnimated && <span>250+</span>)}
                <p>Number of endoscopies</p>
              </div>
              <div className="count">
                {inView && !hasAnimated && (
                  <CountUp
                    start={0}
                    end={50}
                    duration={3}
                    onEnd={() => setHasAnimated(true)}
                  />
                )}
                {!inView || (hasAnimated && <span>50+</span>)}
                <p>Number of Colonoscopies</p>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="img-container">
              <img src="/images/about-us.png" alt="About Us" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
