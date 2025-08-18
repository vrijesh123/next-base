import React from "react";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <section className="container contact-container">
      <div className="title">
        <p>CONTACT US</p>
        <h1>Let’s Connect</h1>
        <p>
          Have questions or need an appointment? Reach out today for expert
          digestive care.
        </p>
      </div>

      <ContactForm />
    </section>
  );
};

export default ContactUs;
