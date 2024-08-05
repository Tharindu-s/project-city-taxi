

import Link from 'next/link'
import VideoPopup from '../elements/VideoPopup'
import CounterUp from '../elements/CounterUp'

export default function About1() {
    return (
        <>
            <section className="about-section section-padding fix"  id="about">
                <div className="container">
                    <div className="about-wrapper">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="about-image-items">
                                    <div className="counter-shape float-bob-y">
                                        <div className="icon">
                                            <img src="/assets/img/about/icon-1.svg" alt="icon-img" />
                                        </div>
                                        <div className="content">
                                            <h3><CounterUp count={6561}/>+</h3>
                                        </div>
                                    </div>
                                    <VideoPopup style={2} />
                                    <div className="about-image-1 bg-cover wow fadeInLeft" data-wow-delay=".3s" style={{ backgroundImage: 'url("assets/img/about/01.jpg")' }}>
                                        <div className="about-image-2 wow fadeInUp" data-wow-delay=".5s">
                                            <img src="/assets/img/about/02.jpg" alt="about-img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-4 mt-lg-0">
                                <div className="about-content">
                                    <div className="section-title">
                                        <span className="wow fadeInUp">ABOUT INFOTECK</span>
                                        <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                            We Are Increasing Business Success With <span>Technology</span>
                                        </h2>
                                    </div>
                                    <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                                        It is a long established fact that a reader will be distracted the readable <br /> content of a page when looking at layout the point.
                                    </p>
                                    <div className="about-icon-items">
                                        <div className="icon-items wow fadeInUp" data-wow-delay=".7s">
                                            <div className="icon">
                                                <img src="/assets/img/about/icon-2.svg" alt="icon-img" />
                                            </div>
                                            <div className="content">
                                                <h4>Problem Solving</h4>
                                                <p>
                                                    Aliquam erat volutpat Nullam imperdiet
                                                </p>
                                            </div>
                                        </div>
                                        <div className="icon-items wow fadeInUp" data-wow-delay=".9s">
                                            <div className="icon">
                                                <img src="/assets/img/about/icon-3.svg" alt="icon-img" />
                                            </div>
                                            <div className="content">
                                                <h4>Mission &amp; Vision</h4>
                                                <p>
                                                    Aliquam erat volutpat Nullam imperdiet
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="about-author">
                                        <div className="about-button wow fadeInUp" data-wow-delay=".5s">
                                            <Link href="/about" className="theme-btn">
                                                Explore More
                                                <i className="fa-solid fa-arrow-right-long" />
                                            </Link>
                                        </div>
                                        <div className="author-image wow fadeInUp" data-wow-delay=".7s">
                                            <img src="/assets/img/about/author.png" alt="author-img" />
                                            <div className="content">
                                                <h6>Ronald Richards</h6>
                                                <p>Co, Founder</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
