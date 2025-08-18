import React from "react";
import moment from "moment";
import { BASE_URL } from "@/api/api";
import Image from "next/image";

const BlogCard = ({ data }) => {
  return (
    <a href={`/blogs/${data?.slug}`} target="_blank">
      <div className="blog-card">
        <div className="img-container">
          {/* <img src={`${BASE_URL}${data?.thumbnail}`} loading="lazy" /> */}
          <Image
            src={`${BASE_URL}${data?.thumbnail}`}
            alt={data?.title}
            width={400} // example width in pixels
            height={300} // example height in pixels
            loading="lazy"
            objectFit="cover"
          />
        </div>

        <div className="card-content">
          <div className="details">
            <h4 className="line-clamp-2">{data?.title}</h4>
            <p
              className="line-clamp-2"
              dangerouslySetInnerHTML={{ __html: data?.sub_title }}
            ></p>
          </div>

          <div className="bottom-content">
            <a href={`/blogs/${data?.slug}`} target="_blank">
              Read More
            </a>
            <span>
              {moment(data?.date ?? data?.created_at)?.format("MMMM DD, yyyy")}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;
