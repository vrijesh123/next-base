import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { BlogListApi } from "@/api/api";
import BlogCard from "../common/cards/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetch_blogs = async (category_ids = "", s_term = "") => {
    try {
      // Build the query string dynamically based on category & search
      let query = "?page_size=100&nested=True&depth=3&order_by=-date";

      if (category_ids.length > 0) {
        const cat_param = category_ids.join(",");
        query += `&category=${cat_param}`;
      }
      if (s_term) {
        // Append the search parameter if it is not blank
        query += `&search=${s_term}`;
      }

      const res = await BlogListApi.get(query);
      setBlogs(res?.results || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetch_blogs();
  }, []);

  return (
    <section className="container">
      <Heading
        name={"blogs"}
        title={
          "Expert tips, medical insights, and advice for better digestive health."
        }
      />

      <div className="blogs-slider">
        <Swiper
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0} // spacing between slides
          slidesPerView={1} // default number of slides to show at a time
          scrollbar={{ draggable: true }} // for draggable scrollbar
          breakpoints={{
            440: {
              slidesPerView: 1, // Show 1 full card + partial next card
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2, // show 2 slides at a time on tablets
              spaceBetween: 0, // medium gap for tablets
            },
            1640: {
              slidesPerView: 3, // show 4 slides at a time on desktops
              spaceBetween: 0, // larger gap for desktop
            },
          }}
        >
          {blogs?.map((data, i) => (
            <SwiperSlide key={i}>
              <BlogCard data={data} />
            </SwiperSlide>
          ))}

          {blogs?.map((data, i) => (
            <SwiperSlide key={i}>
              <BlogCard data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Blogs;
