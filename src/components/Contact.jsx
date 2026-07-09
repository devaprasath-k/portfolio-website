import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import api from '../utils/api.js';
import './Contact.css';

// Fill these in from your EmailJS dashboard (see backend/.env.example for the
// matching server-side keys if you send via the Node API instead).
const EMAILJS_SERVICE_ID = 'service_25twz05';
const EMAILJS_NOTIFY_TEMPLATE_ID = 'template_ug00iqn';
const EMAILJS_REPLY_TEMPLATE_ID = 'template_g24qrhg';
const EMAILJS_PUBLIC_KEY = 'pvHK0lhKZ0bJ0hw47';

function useContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Save to the database FIRST — this is what makes it show up in the
    // admin dashboard's Messages tab. It's a public route (no login needed),
    // just rate-limited on the backend to stop spam.
    // This runs independently of EmailJS: even if your backend is briefly
    // down, the emails below still try to send; even if EmailJS fails, the
    // message is still saved so you don't lose it.
    try {
      await api.post('/messages', form);
    } catch (err) {
      console.warn('Could not save message to the database:', err);
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_NOTIFY_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_REPLY_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY);
      toast.success('Message sent! I will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, handleChange, handleSubmit };
}

export default function Contact() {
  const { form, loading, handleChange, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="contact-full">
      <div className="contact-glass glass">
        <h3 className="section-title"><FaPaperPlane /> Contact Me</h3>

        <form className="contact-form-grid" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required className="full" />
          <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required className="full" />
          <button type="submit" className="btn-primary-glow full" disabled={loading}>
            {loading ? 'Sending…' : <>Send Message <FaPaperPlane /></>}
          </button>
        </form>

        <div className="contact-info-mini" style={{ marginTop: 20, flexDirection: 'row', gap: 24, justifyContent: 'center' }}>
          <span><FaEnvelope /> devaprasathdev@gmail.com</span>
          <span><FaMapMarkerAlt /> India</span>
        </div>
      </div>
    </section>
  );
}
