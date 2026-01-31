import React, { useState } from 'react';
import "../styles/QuizPage.css";
import ContactForm from '../components/ContactForm';

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

const QuizPage = () => {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    type: '',
    style: '',
    deadline: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (step === 1 && !projectData.type) {
      setErrorMessage('Please select the type of service.');
    } else if (step === 2 && !projectData.style) {
      setErrorMessage('Please select a style preference.');
    } else if (step === 3 && !projectData.deadline) {
      setErrorMessage('Please select a project timeline.');
    } else {
      setErrorMessage('');
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleEstimateClick = () => {
    if (!projectData.deadline) {
      setErrorMessage('Please select a project timeline.');
    } else {
      setErrorMessage('');
      setShowForm(true);
    }
  };

  const estimatePricePerM2 = () => {
    let basePricePerM2USD = 0;

    if (projectData.type === 'visual') basePricePerM2USD = 22;
    if (projectData.type === 'technical') basePricePerM2USD = 15;
    if (projectData.type === 'basic') basePricePerM2USD = 30;
    if (projectData.type === 'premium') basePricePerM2USD = 45;

    if (projectData.style === 'premium') basePricePerM2USD += 10;
    if (projectData.deadline === 'soon') basePricePerM2USD += 5;
    if (projectData.deadline === 'urgent') basePricePerM2USD += 10;

    return basePricePerM2USD.toFixed(2) + ' USD/m²';
  };

  const messageText = `Project Type: ${projectData.type}
Style: ${projectData.style}
Deadline: ${projectData.deadline}
Estimated Price: ${estimatePricePerM2()}`;

  return (
    <div className="quiz-page">
      <div className="quiz-background" />
      <div className="quiz-overlay" />

      <h2 className="quiz-heading">Estimate your project</h2>

      {step === 1 && (
        <div className="quiz-step">
          <label>What kind of service do you need?</label>
          <select
            name="type"
            onChange={handleChange}
            className="quiz-select"
            value={projectData.type}
          >
            <option value="">Select</option>
            <option value="visual">Visual Project - 22$/m²</option>
            <option value="technical">Technical Project - 15$/m²</option>
            <option value="basic">Basic Design Project - 30$/m²</option>
            <option value="premium">Premium Design Project - 45$/m²</option>
          </select>
          <div className="first-next-button">
            <button onClick={handleNext} className="quiz-button">Next</button>
          </div>
          {errorMessage && step === 1 && <p className="error-message">{errorMessage}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="quiz-step">
          <label>Style preference:</label>
          <select
            name="style"
            onChange={handleChange}
            className="quiz-select"
            value={projectData.style}
          >
            <option value="">Select</option>
            <option value="basic">Minimalist / Basic</option>
            <option value="premium">Premium / Designer</option>
          </select>
          <div className="quizButtons">
            <button onClick={handleBack} className="quiz-button">Back</button>
            <button onClick={handleNext} className="quiz-button">Next</button>
          </div>
          {errorMessage && step === 2 && <p className="error-message">{errorMessage}</p>}
        </div>
      )}

      {step === 3 && !showForm && (
        <div className="quiz-step">
          <label>Project start timeline:</label>
          <select
            name="deadline"
            onChange={handleChange}
            className="quiz-select"
            value={projectData.deadline}
          >
            <option value="">Select</option>
            <option value="flexible">Flexible (3+ months)</option>
            <option value="soon">Soon (1–3 months)</option>
            <option value="urgent">Urgent (within a month)</option>
          </select>
          <div className="quizButtons">
            <button onClick={handleBack} className="quiz-button">Back</button>
            <button onClick={handleEstimateClick} className="quiz-button-estimate">Get Estimate</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}


      {showForm && (
        <div className="quiz-form">
          <h3 className="quiz-estimate">Estimated cost: {estimatePricePerM2()}</h3>
          <button className="quiz-button restart-button"
            onClick={() => {
              setStep(1);
              setShowForm(false);
              setProjectData({ type: '', style: '', deadline: '' });
              setErrorMessage('');
            }}
          >
            Start Over
          </button>
          <p className="quiz-contact-info">Please leave your contact info and we'll get in touch:</p>
          <div className="quizForm">
            <ContactForm onSubmit={handleSubmit} defaultMessage={messageText}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
