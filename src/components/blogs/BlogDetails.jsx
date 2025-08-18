import { BASE_URL, BlogListApi } from "@/api/api";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BlogCard from "../common/cards/BlogCard";
import { useRouter } from "next/router";
import { Markup } from "interweave";

const BlogDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog_data, setblog_data] = useState(null);
  const [loading, setloading] = useState(false);

  const fetch_blog = async () => {
    setloading(true);

    try {
      const res = await BlogListApi.get(`?slug=${slug}&nested=true&depth=3`);
      if (res?.results?.length > 0) {
        setblog_data(res?.results?.[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetch_blog();
  }, [slug]);

  return (
    <section className="container" style={{ marginTop: "60px" }}>
      <div className="blog-detail-container">
        {loading ? (
          <div className="loader">
            <CircularProgress sx={{ color: "#7A5CFA" }} />
          </div>
        ) : (
          <div className="blog-details">
            <div className="img-container">
              <img src={`${BASE_URL}${blog_data?.thumbnail}`} />
            </div>

            <div className="content">
              <p className="date">
                {moment(blog_data?.date ?? blog_data?.created_at)?.format(
                  "MMMM DD, yyyy"
                )}
              </p>
              <p className="read-time">{blog_data?.readtime} read time</p>

              {blog_data?.tags !== "" && (
                <div className="blog-tags">
                  <div className="tags">
                    {blog_data?.tags?.split(",").map((tag, i) => (
                      <div className="tag" key={i}>
                        <Markup content={tag} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <h1>{blog_data?.title}</h1>

              <p className="sub-title">{blog_data?.sub_title}</p>
              <div
                dangerouslySetInnerHTML={{ __html: blog_data?.featured_text }}
              />

              <div dangerouslySetInnerHTML={{ __html: blog_data?.text }} />
            </div>
          </div>
        )}

        {blog_data?.api_recommended?.length > 0 && (
          <div className="recommended-blogs">
            <div className="blogs">
              <h2>Recommended</h2>
              {blog_data?.api_recommended?.map((blog, i) => (
                <BlogCard key={i} data={blog} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogDetails;
