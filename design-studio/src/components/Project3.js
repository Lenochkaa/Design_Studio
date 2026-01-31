import React from "react";
import "../styles/Project3.css";
import ScrollToTopButton from './ScrollToTopButton';
import project3_1 from "../assets/img/project3_1.jpg";
import project3_2 from "../assets/img/project3_2.jpg";

const projectDetails = [
  {
    imgSrc: project3_1,
    description: "Our team implemented a project to renovate and decorate a studio apartment, creating a modern, functional, and cozy space. The main task was to optimize the limited space by combining aesthetics with maximum practicality. We chose a Scandinavian style with light accents of minimalism to make the room look spacious, bright, and harmonious.",
  },
  {
    imgSrc: project3_2,
    description: "Zoning was a key aspect of the project. It was decided to conditionally divide the space into three main areas: a rest area with a large bed, a kitchen area with a small dining area, and a compact workspace near the panoramic window. Lightweight techniques such as different floor textures, decorative wood slats, and accent lighting were used to separate the zones.",
  },
  {
    imgSrc: project3_1,
    description: "We used a neutral color scheme in the decoration: warm white shades for the walls, light wooden laminate flooring and gray accents in the furniture. The furniture was selected with multifunctionality in mind: a compact sofa bed, wardrobes with mirrored doors to visually enlarge the space, and hidden storage systems to keep things tidy.",
  },
  {
    imgSrc: project3_2,
    description: "Particular attention was paid to the lighting, which includes general soft light, LED lighting of the kitchen set and local lamps in the seating area. The décor complemented the space with minimalist paintings, textiles made from natural materials, and several green plants that add vitality. Thanks to this project, the studio apartment has become a comfortable and stylish home that meets the needs of a modern resident.",
  },
];

function Project3() {
  return (
    <div className="project3">
      <h1>Project 3: Renovation and decoration of a studio flat</h1>
      <div className="project3-gallery">
        {projectDetails.map((item, index) => (
          <div className="project3-item" key={index}>
            <img src={item.imgSrc} alt={`Project 3 Photo ${index + 1}`} />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default Project3;
