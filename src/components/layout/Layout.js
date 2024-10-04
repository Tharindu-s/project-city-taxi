"use client";
import { useEffect, useState } from "react";
import BackToTop from "../elements/BackToTop";
import Breadcrumb from "./Breadcrumb";

import Offcanvas from "./Offcanvas";
import Footer1 from "./footer/Footer1";
import Header1 from "./header/Header1";
export default function Layout({
  headerStyle,
  footerStyle,
  onePageNav,
  breadcrumbTitle,
  children,
}) {
  const [scroll, setScroll] = useState(0);

  const [isOffCanvas, setOffCanvas] = useState(false);
  const handleOffCanvas = () => setOffCanvas(!isOffCanvas);

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({
      live: false,
    });
    window.wow.init();

    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, []);
  return (
    <div>
      <Offcanvas isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />

      {headerStyle == 1 ? (
        <Header1
          scroll={scroll}
          onePageNav={onePageNav}
          isOffCanvas={isOffCanvas}
          handleOffCanvas={handleOffCanvas}
        />
      ) : null}

      {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

      {children}

      {!footerStyle && <Footer1 />}
      {footerStyle == 1 ? <Footer1 /> : null}

      <BackToTop />
    </div>
  );
}
