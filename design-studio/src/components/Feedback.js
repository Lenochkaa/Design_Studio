import React, { useState } from "react";
import "../styles/Feedback.css";
import user from "../assets/img/user.png";
import user2 from "../assets/img/user2.jpg";
import before1 from "../assets/img/before1.jpg";
import after1 from "../assets/img/after1.jpg";
import before2 from "../assets/img/before2.jpg";
import after2 from "../assets/img/after2.jpg";
import before3 from "../assets/img/before3.jpg";
import after3 from "../assets/img/after3.jpg";


function Feedbacks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const feedbacks = [
    {
      name: "Ivan",
      avatar: user,
      rating: 5,
      projectType: "Design Project",
      date: "March 2025",
      text: "Great studio, they work quickly and professionally! I really liked the atmosphere in the team, and the result exceeded all expectations. Thanks to their approach, I got exactly what I wanted. I recommend them to everyone!",
      beforeImage: before1,
      afterImage: after1
    },
    {
      name: "Mariia",
      avatar: user2,
      rating: 4,
      projectType: "Interior Renovation",
      date: "February 2025",
      text: "I am incredibly pleased with the result! Each step of the work was clearly agreed upon, and the team took into account all my wishes. After completing the project, I was amazed at how great everything looks! Thank you for your work!",
      beforeImage: before2,
      afterImage: after2
    },
    {
      name: "Oleksii",
      avatar: user,
      rating: 5,
      projectType: "Furniture Design",
      date: "January 2025",
      text: "Excellent service and high level of design! Initially, there was a small problem with the details of the project, but the team quickly resolved it and implemented all my wishes. They demonstrated a high level of professionalism and efficiency. As a result, I got a great design that exceeded my expectations. I recommend them!",
      beforeImage: before3,
      afterImage: after3
    },
  ];

  const nextFeedback = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const prevFeedback = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + feedbacks.length) % feedbacks.length
    );
  };

  const getStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        &#9733;
      </span>
    ));
  };

  return (
    <div className="feedbacks">
      <div className="feedbacks-background" />
      <div className="feedbacks-overlay" />
      <h1>Reviews</h1>
      <div className="feedbacks-wrapper">
        <button className="feedbacksbuttons nav-left" onClick={prevFeedback}>‹</button>
        <div className="mobile-buttons">
          <button className="feedbacksbuttons" onClick={prevFeedback}>‹</button>
          <button className="feedbacksbuttons" onClick={nextFeedback}>›</button>
        </div>
        <div className="feedback">
          <div className="feedback-header">
            <img className="feedback-avatar" src={feedbacks[currentIndex].avatar} alt="Avatar" />
            <div>
              <p className="feedback-name">{feedbacks[currentIndex].name}</p>
              <p className="feedback-date">{feedbacks[currentIndex].date}</p>
              <div className="feedback-rating">{getStars(feedbacks[currentIndex].rating)}</div>
            </div>
          </div>
          <p className="feedback-text">{feedbacks[currentIndex].text}</p>
          <h3 className="feedback-project-type">{feedbacks[currentIndex].projectType}</h3>
          <div className="feedback-images">
            <div className="feedback-before">
              <p>Before:</p>
              <img src={feedbacks[currentIndex].beforeImage} alt="Before" className="feedback-image" />
            </div>
            <div className="feedback-after">
              <p>After:</p>
              <img src={feedbacks[currentIndex].afterImage} alt="After" className="feedback-image" />
            </div>
          </div>
        </div>
        <button className="feedbacksbuttons nav-right" onClick={nextFeedback}>›</button>
      </div>
    </div>
  );
}

export default Feedbacks;
