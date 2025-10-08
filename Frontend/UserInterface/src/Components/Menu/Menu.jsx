import React from "react";
import { useNavigate } from "react-router-dom";
import heroThumb from "../../assets/hero-img/f.png";
import aboutThumb1 from "../../assets/about-img/about1.jpg";
import aboutThumb2 from "../../assets/about-img/about2.jpg";
import aboutThumb3 from "../../assets/about-img/about3.jpg";
import aboutThumb4 from "../../assets/about-img/about4.jpg";
import featureIcon1 from "../../assets/features-icon/36c2306c-6dfe-4bcc-b35d-9800d52ff2de.svg";
import featureIcon2 from "../../assets/features-icon/4922db64-349d-4e40-ae0a-5872bc012607.svg";
import featureIcon3 from "../../assets/features-icon/ab7ad438-e320-414e-a206-28e1752343dd.svg";
import featureIcon4 from "../../assets/features-icon/d7d3df0c-daae-49e7-83a2-682ff0bdf44b.svg";
import overlayIcon1 from "../../assets/overlay-icons/overlay1.png";
import overlayIcon2 from "../../assets/overlay-icons/overlay2.png";
import overlayIcon3 from "../../assets/overlay-icons/overlay3.png";
import overlayIcon9 from "../../assets/overlay-icons/overlay9.png";
import "./menu.css";

const HeroBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-banner-content container">
      <br /><br />
      <div className="row justify-content-center align-items-center">
        <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
          <div className="hero-banner-content-left">
            <h6>We Provide All Health Care Solution</h6>
            <h1>Protect Your Health And Take Care To Of Your Health</h1>
          </div>
        </div>
        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12">
          <div className="hero-banner-content-right">
            <figure>
              <img src={heroThumb} alt="heroThumb" className="img-fluid" />
            </figure>
          </div>
        </div>
      </div>
      <div className="overlay-icon" style={{ top: "50%", left: "20px" }}>
        <img src={overlayIcon1} alt="" />
      </div>
      <div className="overlay-icon" style={{ top: "20%", left: "25%" }}>
        <img src={overlayIcon2} alt="" />
      </div>
      <div className="overlay-icon" style={{ top: "30%", left: "45%" }}>
        <img src={overlayIcon9} alt="" />
      </div>
      <div className="overlay-icon" style={{ top: "65%", left: "30%" }}>
        <img src={overlayIcon3} alt="" />
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
      <div className="container">
        <div className="row align-items-center justify-content-center h-100">
          <div className="col-xl-6 about-left">
            <div className="aboutUs-gallery">
              <div className="gallery-item">
                <figure>
                  <img src={aboutThumb1} alt="" className="img-fluid" style={{ width: "255px", height: "270px" }} />
                </figure>
              </div>
              <div className="gallery-item">
                <figure>
                  <img src={aboutThumb2} alt="" className="img-fluid" style={{ width: "255px", height: "270px" }} />
                </figure>
              </div>
              <div className="gallery-item">
                <figure>
                  <img src={aboutThumb4} alt="" className="img-fluid" style={{ width: "255px", height: "270px" }} />
                </figure>
              </div>
              <div className="gallery-item">
                <figure>
                  <img src={aboutThumb3} alt="" className="img-fluid" style={{ width: "255px", height: "270px" }} />
                </figure>
              </div>
            </div>
          </div>
          <div className="col-xl-6 about-right">
            <div className="aboutUs-content">
              <div className="section-title" style={{ textAlign: "left" }}>
                <h6>About Us</h6>
                <h2>The Great Place Of Medical Hospital Center</h2>
              </div>
              <p>
                We provide the special tips and advice’s of health care treatment
                and high level of best technology involved in our hospital.
              </p>
              <div className="features">
                <div className="features-item">
                  <img src={featureIcon1} alt="features-icon" />
                  <p>Emergency Help</p>
                </div>
                <div className="features-item">
                  <img src={featureIcon2} alt="features-icon" />
                  <p>Qualified Doctors</p>
                </div>
                <div className="features-item">
                  <img src={featureIcon3} alt="features-icon" />
                  <p>Best Professionals</p>
                </div>
                <div className="features-item">
                  <img src={featureIcon4} alt="features-icon" />
                  <p>Medical Treatment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

const WorkProcess = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="section-title" style={{ textAlign: "center" }}>
        <h6>Working Process</h6>
        <h2>How We Work?</h2>
      </div>
      <div className="WorkProcess-cards">
        <div className="WorkProcess-card shadow-lg bg-light">
          <h1>01</h1>
          <div>
            <h5>Registration</h5>
            <p>
              Complete your registration quickly and easily. We’ll collect the essentials to get you started.
            </p>
          </div>
        </div>
        <div className="WorkProcess-card shadow-lg bg-light">
          <h1>02</h1>
          <div>
            <h5>Make Appointment</h5>
            <p>
              Book your appointment at your convenience. Choose your preferred time and secure your slot.
            </p>
          </div>
        </div>
        <div className="WorkProcess-card shadow-lg bg-light">
          <h1>03</h1>
          <div>
            <h5>Take Treatment</h5>
            <p>
              Receive the care you need during your visit. Our team ensures a smooth and effective treatment.
            </p>
          </div>
        </div>
      </div><br />
    </div>
  );
};

const Menu = () => {
  return (
    <>
      <section className="section">
        <HeroBanner />
      </section>
      <section className="section">
        <AboutUs />
      </section>
      <section className="section">
        <WorkProcess />
      </section>
    </>
  );
};

export default Menu;
