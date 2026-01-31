import React, { useRef } from "react";
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../styles/Home.css";
import ProjectExamples from './ProjectExamples';
import ContactForm from './ContactForm'; 
import FAQ from './FAQ';
import ScrollToTopButton from './ScrollToTopButton';
import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";
import team from "../assets/img/team.png";

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


function Home() {
  const contactFormRef = useRef(null);

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('The request has been sent!');
        e.target.reset(); 
      } else {
        alert('Error during sending.');
      }
    } catch (error) {
      alert('Error during sending.');
    }
  };

  return (
    <div className="home">
      <div className="slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }} 
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1000}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={img1} alt="Slide 1" className="slide-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} alt="Slide 2" className="slide-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} alt="Slide 3" className="slide-image" />
          </SwiperSlide>
        </Swiper>

        <div className="slider-overlay"></div>
        <div className="slider-text-overlay">
          <h1>Your Dream, Our Design</h1>
          <p>Elegant interiors tailored for your lifestyle</p>
        </div>
      </div>

      <div className="studio-description-wrapper">
        <div className="studio-description-text">
          <h2>About our design studio</h2>
          <p>
            We are a team of professionals specializing in creating unique
            interiors for any space. Our projects range from luxury homes and
            apartments to stylish restaurants and business spaces.
          </p>
          <p>
            We strive to combine aesthetics and functionality to ensure that each
            project meets the highest quality standards and individual requirements
            of our clients.
          </p>
        </div>
        <div className="studio-description-image">
          <img src={team}alt="Our Team" />
        </div>
      </div>

      <div className="quiz-cta">
        <p className="quiz-cta-text">
          You have the opportunity to estimate the cost of your project quickly and easily!
        </p>
        <Link to="/quiz" className="quiz-button-link">
          Estimate My Project
        </Link>
      </div>

      <div className="advantages-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="advantages-grid">
          <div className="advantage-card">
            <span>🎯</span>
            <p>Personalized approach to each project</p>
          </div>
          <div className="advantage-card">
            <span>🛋️</span>
            <p>Modern and functional interior solutions</p>
          </div>
          <div className="advantage-card">
            <span>🎨</span>
            <p>3D visualization before implementation</p>
          </div>
          <div className="advantage-card">
            <span>📐</span>
            <p>Technical drawings and specifications included</p>
          </div>
          <div className="advantage-card">
            <span>⏱️</span>
            <p>Strict adherence to deadlines</p>
          </div>
          <div className="advantage-card">
            <span>🌍</span>
            <p>Remote work with clients from any location</p>
          </div>
        </div>
      </div>

      <div className="reviews-button-wrapper">
        <Link to="/feedback" className="reviews-button">
          View reviews
        </Link>
      </div>

      <div className="design-styles">
        <h3>Our styles</h3>
        <div className="style-item">
          <p>Classic</p>
        </div>
        <div className="style-item">
          <p>Modernity</p>
        </div>
        <div className="style-item">
          <p>Bohemianism</p>
        </div>
      </div>

      <ProjectExamples />

      <div className="steps-section">
        <h2 className="section-title">How We Work</h2>
        <div className="steps-grid">
          <div className="step-card">
            <span>📞</span>
            <h4>1. First Contact</h4>
            <p>We discuss your vision, space, and goals for the project.</p>
          </div>
          <div className="step-card">
            <span>🧠</span>
            <h4>2. Concept and Planning</h4>
            <p>We create a functional layout and visual concept tailored to your needs.</p>
          </div>
          <div className="step-card">
            <span>🎨</span>
            <h4>3. Visualization</h4>
            <p>We provide photorealistic 3D renders and moodboards for approval.</p>
          </div>
          <div className="step-card">
            <span>📐</span>
            <h4>4. Project Documentation</h4>
            <p>We deliver technical drawings and specifications for implementation.</p>
          </div>
        </div>
      </div>

      <h2 className="services-slider-h2">Our services</h2>
      <div className="services-slider">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          speed={800}
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1200: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="servicesSwiper"
        >
          <SwiperSlide>
            <div className="service-card">
              <h3>"Express" Design Consultation</h3>
              <ul>
                <li>On-site consultation (up to 2 hours)</li>
                <li>Measurement and basic sketches</li>
                <li>Recommendations for layout improvements</li>
                <li>Furniture arrangement advice</li>
                <li>Lighting and color scheme suggestions</li>
                <li>Answers to any design-related questions</li>
                <li>Summary report after the consultation</li>
              </ul>

              <div className="buttons">
                <p className="price">$150/visit</p>
                <button className="order-btn" onClick={scrollToContactForm}>Book consultation</button>
                <button className="example-btn" onClick={() => window.location.href="/portfolio"}>Project example</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="service-card">
              <h3>"Visual" Project</h3>
              <ul>
                <li>Measurement plan of the premises</li>
                <li>3 layout/replanning options</li>
                <li>Demolition plan of existing partitions</li>
                <li>Installation plan for new partitions</li>
                <li>Floor plan after replanning</li>
                <li>Furniture layout with dimensions</li>
                <li>Selection of furniture, plumbing, lighting</li>
                <li>Interior visualization (3–5 views per room)</li>
              </ul>

              <div className="buttons">
                <p className="price">$22/m²</p>
                <button className="order-btn" onClick={scrollToContactForm}>Order project</button>
                <button className="example-btn" onClick={() => window.location.href="/portfolio"}>Project example</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="service-card">
              <h3>"Technical" Project</h3>
              <ul>
                <li>Measurement plan of the premises</li>
                <li>3 layout/replanning options</li>
                <li>Partition demolition and installation scheme</li>
                <li>Furniture layout with dimensions</li>
                <li>Lighting layout</li>
                <li>Socket and power supply layout</li>
                <li>Plumbing layout</li>
                <li>Underfloor heating layout</li>
              </ul>
              <div className="buttons">
                <p className="price">$15/m²</p>
                <button className="order-btn" onClick={scrollToContactForm}>Order project</button>
                <button className="example-btn" onClick={() => window.location.href="/portfolio"}>Project example</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="service-card">
              <h3>"Basic" Design Project</h3>
              <ul>
                <li>Everything from the "Technical" project +</li>
                <li>Interior concept</li>
                <li>Ceiling, air conditioning, and ventilation layout</li>
                <li>Room finishing plan</li>
                <li>Lighting and plumbing specifications</li>
                <li>Detailed kitchen and bathroom elevations</li>
                <li>Printed album (2 copies)</li>
              </ul>

              <div className="buttons">
                <p className="price">$30/m²</p>
                <button className="order-btn" onClick={scrollToContactForm}>Order project</button>
                <button className="example-btn" onClick={() => window.location.href="/portfolio"}>Project example</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="service-card">
              <h3>"Premium" Design Project</h3>
              <ul>
                <li>Everything from the "Basic" project +</li>
                <li>Author's supervision (10 visits included)</li>
                <li>Furniture and decor selection assistance</li>
                <li>Material procurement support</li>
                <li>Custom-made furniture drawings</li>
                <li>Budget planning and tracking</li>
                <li>Assistance with contractor selection</li>
              </ul>

              <div className="buttons">
                <p className="price">$45/m²</p>
                <button className="order-btn" onClick={scrollToContactForm}>Order project</button>
                <button className="example-btn" onClick={() => window.location.href="/portfolio"}>Project example</button>
              </div>
            </div>
          </SwiperSlide>
      </Swiper>
      </div>

      <div className="quiz-intro-block">
        <p className="quiz-intro-text">
          Take a quick quiz to get an instant estimate for your design project.
          It only takes 1–2 minutes!
        </p>
        <div className="quiz-button-div">
          <Link to="/quiz" className="quiz-button-link">
            Estimate My Project
          </Link>
        </div>
      </div>

      <p className="infoCities">
        We work in Kyiv, Lviv, Odesa, Vinnytsia, Kharkiv, Mykolaiv and other cities of Ukraine. 
        To receive any detailed information by e-mail, please fill out the form or 
        call the number on the {" "}
        <Link to="/contact" className="contacts-link">
          Contacts
        </Link>{" "}
        tab.
      </p>
      
      <div className="contact-form" ref={contactFormRef}>
        <ContactForm onSubmit={handleSubmit} />
      </div>

      <FAQ />
      <ScrollToTopButton />
    </div>
  );
}

export default Home;
