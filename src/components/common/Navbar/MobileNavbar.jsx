import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const MobileNavbar = ({ check, openSubMenu, toggleSubMenu }) => {
  return (
    <div className={check ? "active-mobile-menu mobile-menu" : "mobile-menu"}>
      <ul>
        <Link href={"/"}>
          <li>Home</li>
        </Link>

        <Link href={"/about-us"}>
          <li>About Us</li>
        </Link>

        <li className="sub-menu" onClick={() => toggleSubMenu("more")}>
          <div className="menu-item">
            <p>More</p>
            <div className="icon-container">
              {openSubMenu.more ? <Close /> : <AddIcon />}
            </div>
          </div>
          {openSubMenu.more && (
            <ul>
              <Link href={"/blogs"}>
                <li className="sub-menu">
                  <p>Blogs</p>
                </li>
              </Link>
              <Link href={"/faq"}>
                <li className="sub-menu">
                  <p>FAQ&apos;s</p>
                </li>
              </Link>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default MobileNavbar;
