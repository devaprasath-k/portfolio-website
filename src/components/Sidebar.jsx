import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCode,
  FaFolderOpen,
  FaCertificate,
  FaFileAlt,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/#home", label: "Home", icon: <FaHome /> },
  { to: "/#about", label: "About", icon: <FaUser /> },
  { to: "/#skills", label: "Skills", icon: <FaCode /> },
  { to: "/#projects", label: "Projects", icon: <FaFolderOpen /> },
  { to: "/#certificates", label: "Certificates", icon: <FaCertificate /> },
  { to: "/#resume", label: "Resume", icon: <FaFileAlt /> },
  { to: "/#contact", label: "Contact", icon: <FaEnvelope /> },
];

export default function Sidebar() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  const [active, setActive] = useState("Home");

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="sidebar glass">
      {/* Logo */}

      <div className="sidebar-top">
        <Logo size={52} />
        <h2 className="sidebar-name">Devaprasath K</h2>
      </div>

      {/* Mobile Menu */}

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation */}

      <nav className={`sidebar-nav ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`sidebar-link ${
              active === item.label ? "active" : ""
            }`}
            onClick={() => {
              setActive(item.label);
              setMenuOpen(false);
            }}
          >
            <span className="sidebar-icon">{item.icon}</span>

            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Theme */}

      <div className="sidebar-bottom">
        <button
          className="theme-toggle"
          onClick={() => setDark(!dark)}
          aria-label="Toggle Theme"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}