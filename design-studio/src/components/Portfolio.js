import React, { useState } from "react";
import "../styles/Portfolio.css";
import project1 from "../assets/img/project3_1.jpg";
import project2 from "../assets/img/project4_1.jpg";
import project3 from "../assets/img/project3_2.jpg";
import project4 from "../assets/img/project4_2.jpg";

const projects = [
  {
    title: "Project 1",
    description: "Interior design for a bookstore",
    image: project1,
    link: "/portfolio/project1",
    type: "interior",
    area: 50,
  },
  {
    title: "Project 2",
    description: "Rebranding for a beauty salon",
    image: project2,
    link: "/portfolio/project2",
    type: "branding",
    area: 30,
  },
  {
    title: "Project 3",
    description: "Renovation and decoration of a studio flat",
    image: project3,
    link: "/portfolio/project3",
    type: "interior",
    area: 42,
  },
  {
    title: "Project 4",
    description: "Home office design in a small room",
    image: project4,
    link: "/portfolio/project4",
    type: "interior",
    area: 35,
  },
  {
    title: "Project 5",
    description: "Brand identity for a cozy boutique bakery",
    image: project4,
    link: "/portfolio/project1",
    type: "branding",
    area: 90,
  },
  {
    title: "Project 6",
    description: "Interior transformation of a compact yoga studio",
    image: project3,
    link: "/portfolio/project2",
    type: "interior",
    area: 77,
  },
  {
    title: "Project 7",
    description: "Visual branding for a handmade ceramics workshop",
    image: project2,
    link: "/portfolio/project3",
    type: "branding",
    area: 65,
  },
  {
    title: "Project 8",
    description: "Functional redesign of a small rental apartment",
    image: project1,
    link: "/portfolio/project4",
    type: "interior",
    area: 29,
  },
];

function Portfolio() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const typeMatch = selectedType === "all" || project.type === selectedType;
    const areaMatch =
      selectedArea === "all" ||
      (selectedArea === "small" && project.area <= 40) ||
      (selectedArea === "medium" && project.area > 40 && project.area <= 70) ||
      (selectedArea === "large" && project.area > 70);
    return typeMatch && areaMatch;
  });

    return (
    <div className="portfolio">
      <div className="portfolio-background" />
      <div className="portfolio-overlay" />
      <h2>Our projects</h2>

      <div className="filters">
        <label>
          Type:
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="all">All</option>
            <option value="interior">Interior</option>
            <option value="branding">Branding</option>
          </select>
        </label>

        <label>
          Area:
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
            <option value="all">All</option>
            <option value="small">Up to 40 m²</option>
            <option value="medium">41–70 m²</option>
            <option value="large">Over 70 m²</option>
          </select>
        </label>
      </div>

      <div className="portfolio-gallery">
        {filteredProjects.map((project, index) => (
          <div
            className="portfolio-item"
            key={index}
            style={{ "--delay": `${index * 0.05}s` }}
          >
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} className="view-details">Details</a>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Portfolio;
