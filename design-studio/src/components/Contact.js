import React from "react";
import "../styles/Contact.css";
import ContactForm from './ContactForm'; 

function Contact() {

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
  
  return (
    <div className="contact">
      
      <div className="contact-info">
      <h1>Contacts</h1>
        <div className="contact-item">
          <h3>Phone number:</h3>
          <p><a href="tel:+380123456789">+38 012 345 67 89</a></p>
        </div>
        
        <div className="contact-item">
          <h3>Email:</h3>
          <p><a href="mailto:info@company.com">info@company.com</a></p>
        </div>
        
        <div className="contact-item">
          <h3>Addres:</h3>
          <p>8 Illinska Street, Kyiv, Ukraine</p>
        </div>
      </div>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20317.925205191175!2d30.5215758!3d50.464554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce40f315d233%3A0x633596d5b3593996!2z0IbQu9C70ZbQvdGB0YzQutC40Lk!5e0!3m2!1suk!2spl!4v1733416095980!5m2!1suk!2spl"
          width="1400"
          height="400"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      <p className="form-description">
        If you have any questions, please fill out the form below and we will get back to you as soon as possible. You can also call us at the number below or visit our welcoming office!
      </p>
      
      <div className="formContactPage">
        <ContactForm onSubmit={handleSubmit} />
      </div>      
    </div>
  );
}

export default Contact;
