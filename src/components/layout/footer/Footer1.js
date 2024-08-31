import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/assets/img/logo/logo white.png";

export default function Footer1() {
  return (
    <>
      <footer className="footer-section">
        <div className="footer-widgets-wrapper footer-bg">
          <div className="shape-1">
            <img src="/assets/img/footer-shape-1.png" alt="shape-img" />
          </div>

          <div className="container">
            <div className="row">
              <div
                className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay=".3s"
              >
                <div className="single-footer-widget">
                  <div className="widget-head">
                    <Link href="/">
                      <Image
                        src={logo}
                        width={110}
                        height={50}
                        alt="logo-img"
                      />
                    </Link>
                  </div>
                  <div className="footer-content">
                    <p>
                      Phasellus ultricies aliquam volutpat ullamcorper laoreet
                      neque, a lacinia curabitur lacinia mollis
                    </p>
                    <div className="social-icon d-flex align-items-center">
                      <Link href="#">
                        <i className="fab fa-facebook-f" />
                      </Link>
                      <Link href="#">
                        <i className="fab fa-twitter" />
                      </Link>
                      <Link href="#">
                        <i className="fa-brands fa-linkedin-in" />
                      </Link>
                      <Link href="#">
                        <i className="fa-brands fa-youtube" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp"
                data-wow-delay=".9s"
              >
                <div className="single-footer-widget">
                  <div className="widget-head">
                    <h3>Quick Links</h3>
                  </div>
                  <div className="footer-content">
                    <ul className="list-area">
                      <li>
                        <Link href="/">
                          <i className="fa-solid fa-chevron-right" />
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/service">
                          <i className="fa-solid fa-chevron-right" />
                          Book now
                        </Link>
                      </li>
                    </ul>
                    <Link href="/book" className="theme-btn hover-white mt-4">
                      Book now
                      <i className="fa-solid fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-wrapper d-flex align-items-center justify-content-between">
              <p className="wow fadeInLeft color-2" data-wow-delay=".3s">
                © All Copyright {new Date().getFullYear()} by{" "}
                <Link href="/">Infotech</Link>
              </p>
              <ul className="footer-menu wow fadeInRight" data-wow-delay=".5s">
                <li>
                  <Link href="/contact">Terms &amp; Condition</Link>
                </li>
                <li>
                  <Link href="/contact">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <Link href="#" id="scrollUp" className="scroll-icon">
            <i className="far fa-arrow-up" />
          </Link>
        </div>
      </footer>
    </>
  );
}
