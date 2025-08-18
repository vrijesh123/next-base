import { Breadcrumbs } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FAQItem from "../common/Faqs/FaqItem";
import { FaqApi } from "@/api/api";

const FrequestQuestions = () => {
  // Fetching Frequently Asked Questions from API
  const [faq, setFaq] = useState([]);
  const [openIndexes, setOpenIndexes] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");

  // Ref object to store references to each category
  const categoryRefs = useRef({});

  const fetch_faq = async () => {
    try {
      const res = await FaqApi.get(`?depth=3&nested=True`);

      setFaq(res?.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch_faq();
  }, []);

  const toggleFAQ = (categoryName, index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [categoryName]: prev[categoryName] === index ? null : index,
    }));
  };

  // Scroll to the selected category
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);

    if (categoryName === "All") {
      window.scrollTo({ bottom: 0, behavior: "smooth" });
    } else if (categoryRefs.current[categoryName]) {
      categoryRefs.current[categoryName].scrollIntoView({ behavior: "smooth" });
    }
  };

  // Group FAQs by category
  const groupedFaqs = faq.reduce((acc, item) => {
    const categoryName = item.category?.name || "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});

  return (
    <section className="container top-section">
      <div role="presentation" className="bread-crumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <p>Frequently Asked Questions</p>
        </Breadcrumbs>
      </div>

      <div className="title">
        <p>FAQ's</p>
        <h1>Find Your Answer</h1>
        <p>
          Have questions about your health? Find clear and reliable answers
          here.
        </p>
      </div>

      {/* Category Chips */}
      <div className="faq-chips">
        <button
          className={`chip ${activeCategory === "All" ? "active" : ""}`}
          onClick={() => handleCategoryClick("All")}
        >
          All
        </button>
        {Object.keys(groupedFaqs).map((categoryName) => (
          <button
            key={categoryName}
            className={`chip ${
              activeCategory === categoryName ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(categoryName)}
          >
            {categoryName}
          </button>
        ))}
      </div>

      {/* Displaying grouped FAQs */}
      <div className="frequent-que-container">
        <div className="faq-section">
          <div className="faq-container">
            <div className="faqs">
              {Object.entries(groupedFaqs).map(([categoryName, faqs]) => (
                <div
                  key={categoryName}
                  className="faq-category"
                  ref={(el) => {
                    if (el) {
                      categoryRefs.current[categoryName] = el;
                    }
                  }}
                >
                  <h2>{categoryName}</h2>
                  <ul>
                    {faqs?.map((faq, index) => (
                      <FAQItem
                        key={index}
                        faq={faq}
                        isOpen={openIndexes[categoryName] === index}
                        toggle={() => toggleFAQ(categoryName, index)}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrequestQuestions;
