import React from "react";
import "../styles/Project2.css";
import ScrollToTopButton from './ScrollToTopButton';
import project3_1 from "../assets/img/project3_1.jpg";
import project3_2 from "../assets/img/project3_2.jpg";

const projectDetails = [
  {
    imgSrc: project3_1,
    description: "Our team rebranded the interior design of the beauty salon, creating a modern loft-style space that reflects boldness, creativity, and elegance. The main idea was to emphasize the brand's individuality and turn the salon into a stylish place that delights customers.",
  },
  {
    imgSrc: project3_2,
    description: "We chose the loft as the main style because of its openness, texture and ability to create a bright accent on details. We decided to use a combination of natural and industrial materials: raw brick, concrete elements, metal and wood. This combination adds character and uniqueness to the space.",
  },
  {
    imgSrc: project3_2,
    description: "The decor of the salon emphasizes its character: wooden shelves with plants in concrete pots, vintage posters with a beauty theme, metal shelves with cosmetic products, as well as stylish accessories - backlit mirrors, black steel and copper elements.",
  },
];

function Project2() {
  return (
    <div className="project2">
      <h1>Project 2: Beauty salon</h1>
      <div className="project2-gallery">
        {projectDetails.map((item, index) => (
          <div className="project2-item" key={index}>
            <img src={item.imgSrc} alt={`Project 2 Photo ${index + 1}`} />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default Project2;
