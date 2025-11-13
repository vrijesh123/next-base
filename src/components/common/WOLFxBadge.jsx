import useMediaQuery from "@/hooks/useMediaQuery";
import React from "react";

const WOLFxBadge = () => {
  const is_mobile = useMediaQuery("(max-width: 900px)");

  return (
    <a href="https://wolfx.io" target="__blank">
      <div className="wolfx-badge">
        <svg
          width="31"
          height="34"
          viewBox="0 0 31 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.58 34H13.904C11.968 13.012 11.748 11.12 11.704 9.184H11.396C11.352 11.12 11.132 13.012 9.108 34H3.432L0.792 0.691999H4.708C6.248 24.892 6.424 26.696 6.468 28.544H6.82C6.908 26.696 7.128 24.892 9.636 0.691999H13.508C16.06 24.892 16.28 26.696 16.368 28.544H16.72C16.764 26.696 16.852 24.892 18.436 0.691999H22.176L19.58 34ZM30.8123 34H28.5563C27.3323 27.544 27.1883 26.704 27.1163 26.032H26.9483C26.8763 26.704 26.7323 27.544 25.4843 34H23.3003V33.88L25.4363 24.28L23.6363 15.952V15.832H25.8203C26.8523 21.424 26.9723 22.12 27.0203 22.672H27.1883C27.2363 22.12 27.3803 21.424 28.4843 15.832H30.5483V15.952L28.7003 24.232L30.8123 33.88V34Z"
            fill="white"
          />
        </svg>

        <p>Website designed & developed by WOLFx</p>
      </div>
    </a>
  );
};

export default WOLFxBadge;
