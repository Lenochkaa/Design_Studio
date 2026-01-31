import React from "react";
import "../styles/Project1.css";
import ScrollToTopButton from './ScrollToTopButton';
import project3_1 from "../assets/img/project3_1.jpg";
import project3_2 from "../assets/img/project3_2.jpg";

const projectDetails = [
  {
    imgSrc: project3_1,
    description: "Our team created an interior design for a new bookstore, which has become a unique space for book lovers. The main task was to combine functionality, comfort and a cozy atmosphere conducive to a long stay in the store.",
  },
  {
    imgSrc: project3_2,
    description: "We chose the eco-minimalist style because it perfectly matches the concept of a place that encourages reading, relaxation, and immersion in an intellectual atmosphere. It was decided to use natural materials such as wood and metal, which not only add warmth to the space but also create a stress-resistant interior.",
  },
  {
    imgSrc: project3_1,
    description: "For the wall decoration, we chose light shades with accents in the form of book illustrations and a green wall with live plants, which became the visual center of the space. The floor was made of wood-like laminate, which harmoniously complements the overall concept.",
  },
  {
    imgSrc: project3_2,
    description: "Special attention was paid to the lighting. We decided to combine general soft light with accent lighting on the shelves. Local table lamps in the reading area and decorative lamps in the coffee area add atmosphere.",
  },
  {
    imgSrc: project3_2,
    description: "Finally, the space was decorated with details that emphasize the love of books: cozy pillows with quotes from classics, antique typewriters, photographs of iconic writers and posters with covers of famous publications. The shop windows are decorated as a literary exposition, which immediately attracts the attention of passers-by.",
  },
];

function Project1() {
  return (
    <div className="project1">
      <h1>Project 1: Bookstore</h1>
      <div className="project1-gallery">
        {projectDetails.map((item, index) => (
          <div className="project1-item" key={index}>
            <img src={item.imgSrc} alt={`Project 1 Photo ${index + 1}`} />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default Project1;
