import Link from "next/link";
import Menu from "../Menu";
import OnePageNav from "../OnePageNav";
import Image from "next/image";
import logo from "../../../../public/assets/img/logo/logo black.png";

export default function Header1({
  scroll,
  isOffCanvas,
  handleOffCanvas,
  onePageNav,
}) {
  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`header-1 ${scroll ? "sticky" : ""}`}
        >
          <div className="container-fluid">
            <div className="mega-menu-wrapper">
              <div className="header-main style-2">
                <div className="header-left">
                  <div className="logo">
                    <Link href="/" className="header-logo">
                      <Image
                        src={logo}
                        width={110}
                        height={50}
                        alt="logo-img"
                      />
                    </Link>
                  </div>
                </div>
                <div className="header-right d-flex justify-content-end align-items-center">
                  <div className="mean__menu-wrapper">
                    <div className="main-menu">
                      <nav id="mobile-menu">
                        {/* {onePageNav ? <OnePageNav /> : <Menu />} */}
                        <OnePageNav />
                      </nav>
                    </div>
                  </div>

                  <div className="header-button">
                    <Link href="/book" className="theme-btn">
                      <span>
                        Book
                        <i className="fa-solid fa-arrow-right-long" />
                      </span>
                    </Link>
                  </div>
                  <div className="header__hamburger d-xl-block my-auto">
                    <div className="sidebar__toggle" onClick={handleOffCanvas}>
                      <i className="fas fa-bars" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
