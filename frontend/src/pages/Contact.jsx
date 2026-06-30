import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1>📞 Contact Us</h1>

        <p>
          We'd love to hear from you! Fill out the form below and we'll get back
          to you as soon as possible.
        </p>

        <form>
          <input type="text" placeholder="Your Name" required />

          <input type="email" placeholder="Your Email" required />

          <input type="tel" placeholder="Mobile Number" required />

          <textarea
            rows="5"
            placeholder="Write your message..."
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;