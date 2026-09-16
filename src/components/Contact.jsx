import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import api from '../utils/api.js';
import './Contact.css';

const EMAILJS_SERVICE_ID = 'service_25twz05';
const EMAILJS_NOTIFY_TEMPLATE_ID = 'template_ug00iqn';
const EMAILJS_REPLY_TEMPLATE_ID = 'template_g24qrhg';
const EMAILJS_PUBLIC_KEY = 'pvHK0lhKZ0bJ0hw47';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

// One floating-label field: the label sits inside the input at rest, and
// floats up above it the moment the field has focus OR already has a
// value — the CSS drives this off the :focus and :placeholder-shown
// pseudo-classes, no extra JS state needed per field.
function FloatingField({ id, label, type = 'text', textarea = false, value, onChange }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="floating-field">
      <Tag
        id={id}
        name={id}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder=" "   /* a non-empty placeholder is required for :placeholder-shown to work as the "empty" detector */
        required
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Save to the database first — independent of whether EmailJS
    // succeeds, so the message is never lost even if email delivery fails.
    try {
      await api.post('/messages', form);
    } catch (err) {
      console.warn('Could not save message to the database:', err);
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_NOTIFY_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_REPLY_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY);
      toast.success('Message sent! I will get back to you soon.');
      setForm(EMPTY_FORM);
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-full">
      <h3 className="section-title"><FaPaperPlane /> Contact Me</h3>

      <div className="contact-glass glass">
        <form className="contact-form-grid" onSubmit={handleSubmit}>
          <FloatingField id="name" label="Name" value={form.name} onChange={handleChange} />
          <FloatingField id="email" label="Email" type="email" value={form.email} onChange={handleChange} />
          <div className="full">
            <FloatingField id="subject" label="Subject" value={form.subject} onChange={handleChange} />
          </div>
          <div className="full">
            <FloatingField id="message" label="Message" textarea value={form.message} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-primary-glow full" disabled={loading}>
            {loading
              ? <><FaSpinner className="spin" /> Sending…</>
              : <>Send Message <FaPaperPlane /></>}
          </button>
        </form>

        <div className="contact-info-mini contact-info-row">
          <span><FaEnvelope /> devaprasathdev@gmail.com</span>
          <span><FaMapMarkerAlt /> India</span>
        </div>
      </div>
    </section>
  );
}