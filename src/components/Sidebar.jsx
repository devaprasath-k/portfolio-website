import { NavLink,Link } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaFolderOpen, FaCertificate, FaFileAlt, FaEnvelope, FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/#home',hash:'#home', label: 'Home', icon: <FaHome /> },
  { to: '/#about',hash:'#about', label: 'About', icon: <FaUser /> },
  { to: '/#skills',hash:'#skills', label: 'Skills', icon: <FaCode /> },
  { to: '/#projects',hash:'#projects', label: 'Projects', icon: <FaFolderOpen /> },
  { to: '/#certificates',hash:'#certificates', label: 'Certificates', icon: <FaCertificate /> },
  { to: '/#resume',hash:'#resume', label: 'Resume', icon: <FaFileAlt /> },
  { to: '/#contact',hash:'#contact', label: 'Contact', icon: <FaEnvelope /> },
];

export default function Sidebar() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme')!=='light');
  const [active, setActive] = useState('Home');
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',dark ? 'dark': 'light');
    localStorage.setItem('theme',dark ? 'dark': 'light');
  },[dark]);
  

  return (
    <aside className="sidebar glass">
      <div className="sidebar-top">
        <Logo size={64} />
        <h2 className="sidebar-name">Devaprasath K</h2>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`sidebar-link ${active === item.label ? 'active' : ''}`}
            onClick={() => setActive(item.label)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-socials">
          <a href="https://github.com/devaprasath-k" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/devaprasath-k-652347262/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="mailto:devaprasathdev@gmail.com" aria-label="Email"><FaEnvelope /></a>
        </div>
        <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </aside>
  );
}
