import React, { useEffect, useRef } from "react";
import "../styles/About.css";
import about_start from "../assets/img/about_start.jpg";
import about_project from "../assets/img/about_project.jpg";
import about_team from "../assets/img/about_team.jpg";
import about_office from "../assets/img/about_office.jpg";

function About() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  const timelineData = [
    {
      year: "2020",
      title: "Beginning",
      text: "We launched our design studio in 2020, aiming to bring innovation and creativity into the design space. It was our first attempt to create something unique for our clients, and we immediately stood out from the competition thanks to our approach focused on the individual needs of each project.",
      image: about_start,
    },
    {
      year: "2021",
      title: "First big project",
      text: "Our first major project was a crucial milestone in the company's development. Thanks to the success of this project, we gained a reputation in the market and established ourselves as a ourselves as a reliable design studio. This project was an important milestone in our growth, allowing us not only to expand our client base but also to demonstrate our capabilities in implementing large-scale and innovative ideas.",
      image: about_project,
    },
    {
      year: "2022",
      title: "Expanding the team",
      text: " Given the increase in the number of clients and projects, we decided to expand our team. This allowed us to take on even larger and more complex projects. Our team has become more diverse and specialized, allowing us to work with more demanding clients.",
      image: about_team,
    },
    {
      year: "2023",
      title: "New office",
      text: " In 2023, we moved to a new, simpler office, which allowed us to increase our productivity and efficiency. Thanks to the new space, we were able to organize better conditions for the team, improve workflows, and attract new talent to our studio. This step was an important step in the company's development, allowing us to better adapt to new challenges and prospects for future projects.",
      image: about_office,
    },
  ];

  return (
    <div className="about">
      <h1 className="abouth1">Our history</h1>
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="timeline-item"
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-content">
              <div className="timeline-row">
                <div className="timeline-text">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <img
                  src={item.image}
                  alt={item.year}
                  className="timeline-image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
