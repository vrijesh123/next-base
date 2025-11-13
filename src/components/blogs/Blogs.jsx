import {
  Breadcrumbs,
  Button,
  Checkbox,
  FormControlLabel,
  styled,
  Pagination,
  PaginationItem,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import BlogCard from "../common/cards/BlogCard";
import { BlogCategoryApi, BlogListApi } from "@/api/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [selected_categories, setSelectedCategories] = useState([]);
  const [search_term, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
  });

  const blogSectionRef = useRef(null);

  const fetch_blogs = async (category_ids = "", s_term = "", page = 1) => {
    setloading(true);
    try {
      // Build the query string dynamically based on category & search
      let query = `?page=${page}&page_size=9&nested=True&depth=3&order_by=-date`;

      if (category_ids.length > 0) {
        category_ids?.map((cat) => {
          query += `&category=${cat}`;
        });
      }
      if (s_term) {
        // Append the search parameter if it is not blank
        query += `&search=${s_term}`;
      }

      const res = await BlogListApi.get(query);

      setBlogs(res?.results || []);
      setPagination({
        count: Math.ceil(res?.total_items / 9), // Assuming page_size is 9
        next: res?.links?.next,
        previous: res?.links?.previous,
        currentPage: res?.current_page,
      });
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setloading(false);
    }
  };

  const fetchBlogcategories = async () => {
    try {
      const res = await BlogCategoryApi.get(``);
      setBlogCategories(res?.results);
    } catch (err) {
      console.error("Error fetching blog categories:", err);
    }
  };

  useEffect(() => {
    fetch_blogs();
    fetchBlogcategories();
  }, []);

  const handle_category_change = (category_id) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category_id)) {
        return prevSelected.filter((id) => id !== category_id);
      } else {
        return [...prevSelected, category_id];
      }
    });
  };

  const handle_search_change = (e) => {
    setSearchTerm(e.target.value);
  };

  const handle_apply_filter = () => {
    fetch_blogs(selected_categories, search_term, 1); // Reset to page 1 when applying filters
  };

  const clear = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    fetch_blogs();
  };

  const handlePageChange = (event, page) => {
    fetch_blogs(selected_categories, search_term, page);
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    "&.Mui-checked": {
      color: "#3C7777 !important",
    },
  }));

  // Custom styled pagination
  const CustomPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
      color: "#333",
      fontSize: "14px",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "#3C7777",
      color: "white",
      "&:hover": {
        backgroundColor: "#2c5e5e",
      },
    },
    "& .MuiPaginationItem-previousNext": {
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
  }));

  return (
    <section className="container top-section" ref={blogSectionRef}>
      <div className="blogs-page">
        <div className="title">
          <p>All BLOGS</p>
          <h1>Insights & Articles</h1>
          <p>
            Explore expert knowledge, tips, and the latest updates in health and
            wellness.
          </p>
        </div>

        <div className="blogs-page-container">
          <div className="blog-filter">
            <div className="search-container">
              {/* <div className="icon-container">
                <img src="/icons/search.svg" alt="" />
              </div> */}
              <input
                type="text"
                placeholder="Search..."
                value={search_term}
                onChange={handle_search_change}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>

            <div className="filter-box">
              <div className="heading">
                <h4>Filter</h4>

                <p onClick={clear}>Clear</p>
              </div>

              {/* Category checkboxes */}
              <div className="category">
                <ul>
                  {blogCategories?.map((cat) => (
                    <li key={cat.id} style={{ listStyle: "none" }}>
                      <FormControlLabel
                        control={
                          <CustomCheckbox
                            checked={selected_categories.includes(cat.id)}
                            onChange={() => handle_category_change(cat.id)}
                          />
                        }
                        label={cat.category}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* APPLY FILTER BUTTON (optional) */}
              <button onClick={handle_apply_filter} className="cta-btn">
                Apply Filter
              </button>
            </div>
          </div>

          <div className="blogs">
            <div className="card-grid">
              {blogs?.map((blog) => (
                <BlogCard data={blog} key={blog?.id} />
              ))}
            </div>

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {pagination.count > 1 && (
                <CustomPagination
                  count={pagination.count}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  shape="rounded"
                  color="primary"
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: () => "Previous", next: () => "Next" }}
                      {...item}
                    />
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
