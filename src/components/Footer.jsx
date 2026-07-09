import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function Footer() {
  const navigate = useNavigate();
  const clickCount = useRef(0);

  const handleSecretClick = () => {
    clickCount.current += 1;
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      navigate('/admin/login');
    }
  };
  return (
    <footer className="footer">
      <div className="footer-socials">
        <a href="https://github.com/devaprasath-k" target="_blank" rel="noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/devaprasath-k-652347262/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href="mailto:devaprasathdev@gmail.com"><FaEnvelope /></a>
      </div>
      <p className="text-dim" onClick={handleSecretClick} style={{ cursor: 'default' }}>© {new Date().getFullYear()} Devaprasath K. All rights reserved.</p>
      <a href="#home" className="back-to-top"><FaArrowUp /> Back to Top</a>
    </footer>
  );
}
