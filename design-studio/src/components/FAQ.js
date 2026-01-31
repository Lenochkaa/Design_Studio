import React, { useState } from 'react';
import "../styles/FAQ.css";

const faqData = [
  {
    question: "How long does a typical interior project take?",
    answer: "Depending on the complexity, most projects take 4 to 12 weeks from concept to completion.",
  },
  {
    question: "Do you offer online consultations?",
    answer: "Yes, we provide virtual consultations for clients worldwide via video call.",
  },
  {
    question: "What’s included in the design package?",
    answer: "Mood boards, floor plans, 3D visualizations, material selection, and styling recommendations.",
  },
  {
    question: "Can you work with my existing furniture?",
    answer: "Absolutely! We can integrate your favorite pieces into the new design.",
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h4>{faq.question}</h4>
              <span className="arrow">{activeIndex === index ? '▲' : '▼'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
