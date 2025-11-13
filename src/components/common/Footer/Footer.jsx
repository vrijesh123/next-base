import React from "react";
import { BASE_URL } from "../../../api/api";
import Link from "next/link";
import { useSiteSetting } from "@/context/useSiteSettings";
import WOLFxBadge from "../WOLFxBadge";

const Footer = () => {
  const { settings } = useSiteSetting();

  return (
    <div className="footer-container">
      <div className="container">
        <div className="left">
          <div className="company-details">
            <div className="img-container">
              <img
                src={
                  settings?.logo
                    ? `${BASE_URL}${settings?.logo}`
                    : "/images/gk-logo.png"
                }
                alt="Logo"
              />
            </div>

            <p>
              Empowering industries with smart, scalable solutions for
              efficiency and growth.
            </p>
          </div>

          <WOLFxBadge />
        </div>

        <div className="quick-links">
          <div className="links">
            <p className="title">Quick Links</p>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>

              <li>
                <Link href="/contact-us">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="links">
            <p className="title">Resources</p>
            <ul>
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
              <li>
                <Link href="/faq">FAQ&apos;s</Link>
              </li>
            </ul>

            <p className="title">Get In Touch</p>
            <ul>
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings?.email}`}>
                    Email : <span>{settings?.email}</span>
                  </a>
                </li>
              )}
              {settings?.contact_number && (
                <li>
                  <a href={`tel:${settings?.contact_number}`}>
                    Phone : <span>{settings?.contact_number}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>© {new Date().getFullYear()} Company. All Rights Reserved.</p>

        <div>
          <a href="/privacy-policy"> Privacy Policy |</a>
          <a href="/terms-and-conditions"> Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
