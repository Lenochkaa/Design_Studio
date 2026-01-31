import React from 'react';

const ContactForm = ({ onSubmit, defaultMessage }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>Name:</label>
      <input type="text" name="name" required />
      
      <label>Email:</label>
      <input type="email" name="email" required />
      
      <label>Message:</label>
      <textarea name="message" required defaultValue={defaultMessage}></textarea>
      
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
