import React from "react";
import "../styles/Project4.css";
import ScrollToTopButton from './ScrollToTopButton';
import project4_1 from "../assets/img/project4_1.jpg";
import project4_2 from "../assets/img/project4_2.jpg";


const projectDetails = [
  {
    imgSrc: project4_1,
    description: "Our team realized the design of a home office for a small room, creating a functional and comfortable workspace. The main task was to make the most of the limited space and provide a cozy atmosphere for long working hours. We chose a modern style with elements of Scandinavian design that combines simplicity, practicality, and aesthetics.",
  },
  {
    imgSrc: project4_2,
    description: "To optimize the space, we used compact furniture, such as a table with expandable sections, a comfortable chair with back support, and open shelves for storing documents and books. Most of the furniture was selected in light colors to create a feeling of lightness and space, as well as to facilitate access to the necessary things. A separate area was allocated for storing important documents, where we used vertical shelving and drawers instead of bulky cabinets.",
  },
  {
    imgSrc: project4_1,
    description: "Lighting has become a key element in the office design. We used a combination of general light that does not dazzle and local lamps for the workplace. To create a comfortable atmosphere, several dimmable LED lamps were installed in the room, allowing us to adjust the lighting to different needs. The window was left open for natural light, which is important for maintaining concentration and good mood.",
  },
  {
    imgSrc: project4_2,
    description: "The decor of the room was thought out to the smallest detail. We added a few minimalist paintings, potted plants for freshness, and modern desk accessories to add elegance. The space looks organized, without unnecessary chaos, allowing you to concentrate on your work. Thanks to the carefully thought-out design, this home office has become the perfect place to be productive, even in a small room.",
  },
];

function Project4() {
  return (
    <div className="project4">
      <h1>Project 4: Home office design in a small room</h1>
      <div className="project4-gallery">
        {projectDetails.map((item, index) => (
          <div className="project4-item" key={index}>
            <img src={item.imgSrc} alt={`Project 4 Photo ${index + 1}`} />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default Project4;
