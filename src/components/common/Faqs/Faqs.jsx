import React, { useEffect, useRef, useState } from "react";
import FAQItem from "./FaqItem";
import { FaqApi } from "@/api/api";
import Heading from "../Heading";
import gsap from "gsap";

const Faqs = () => {
  const container_ref = useRef(null);
  const faq_ref = useRef([]);

  const [openIndex, setOpenIndex] = useState(null);
  const [faqdata, setFaq] = useState([]);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        // Check if productApi and its get method are defined
        if (FaqApi && typeof FaqApi.get === "function") {
          const data = await FaqApi.get();

          setFaq(data?.results);
        } else {
          // Handle the case where productApi or productApi.get is not defined
          throw new Error(
            "productApi is not defined or does not have a get method"
          );
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchFAQData();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // registerScrollTrigger().then(() => {
    // });
    if (faq_ref.current) {
      gsap.fromTo(
        faq_ref.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container_ref.current,
            start: "top 75%", // Animation starts when the section is 80% in viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [faqdata]);

  return (
    <section className="container faq-section" ref={container_ref}>
      <Heading
        name={"Frequently Asked Questions"}
        title={"Clear answers to common digestive concerns."}
      />

      <div className="faq-container">
        <div className="faqs">
          {faqdata?.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggle={() => toggleFAQ(index)}
              ref={(el) => (faq_ref.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
