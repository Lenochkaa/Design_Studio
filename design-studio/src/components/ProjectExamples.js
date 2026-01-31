import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProjectExamples.css";
import apartment from "../assets/img/project3_1.jpg";
import house from "../assets/img/project3_2.jpg";
import restaurant from "../assets/img/project4_1.jpg";

const projects = [
  {
    title: "Modern apartment in Kyiv",
    image: apartment,
    description: "Light tones, functional zoning, and minimalist decor for urban life.",
  },
  {
    title: "Family house near Lviv",
    image: house,
    description: "Warm natural materials and cozy open space for family comfort.",
  },
  {
    title: "Restaurant in Odesa",
    image: restaurant,
    description: "Bright accents, eclectic style, and atmosphere of the southern coast.",
  },
];

function ProjectExamples() {
  return (
    <div className="project-examples-wrapper">
      <h3>Project examples</h3>
      <div className="project-cards">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.image} alt={project.title} className="project-img" />
            <div className="project-info">
              <h4>{project.title}</h4>
              <p className="project-description">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="portfolio-button-wrapper">
        <Link to="/portfolio" className="portfolio-button">
          View Full Portfolio
        </Link>
      </div>
    </div>
  );
}

export default ProjectExamples;