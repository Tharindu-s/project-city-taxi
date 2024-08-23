import Link from "next/link";

export default function Hero1() {
  return (
    <>
      <section
        className="hero-section fix hero-1 bg-cover"
        style={{ backgroundImage: 'url("assets/img/hero/hero-bg.jpg")' }}
      >
        <div className="text-transparent">
          <h2>City taxi city taxi </h2>
        </div>
        <div className="line-shape">
          <img src="/assets/img/hero/line-shape.png" alt="shape-img" />
        </div>
        <div className="dot-shape">
          <img src="/assets/img/hero/dot-shape.png" alt="shape-img" />
        </div>
        <div className="frame-shape">
          <img src="/assets/img/hero/frame.png" alt="shape-img" />
        </div>
        <div className="mask-shape wow fadeInRight" data-wow-delay=".7s">
          <img src="/assets/img/hero/mask-shape.png" alt="shape-img" />
        </div>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <div className="hero-content">
                <h6 className="wow fadeInUp" data-wow-delay=".2s">
                  Experience Top Taxi Booking Service
                </h6>
                <h1 className="wow fadeInUp" data-wow-delay=".4s">
                  Easy Taxi Bookings for Your Hassle-Free Ride
                </h1>
                <p className="wow fadeInUp" data-wow-delay=".6s">
                  Discover a superior taxi booking experience with our top-rated
                  service. <br /> Enjoy seamless reservations, reliable rides,
                  and unmatched convenience for all your travel needs.
                </p>
                <div className="hero-button">
                  <Link
                    href="/about"
                    className="theme-btn wow fadeInUp"
                    data-wow-delay=".8s"
                  >
                    Book now
                    <i className="fa-solid fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hero-image wow fadeInUp" data-wow-delay=".4s">
                <img src="/assets/img/hero/hero.png" alt="hero-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
