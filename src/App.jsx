import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

import Sidebar from './components/Sidebar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Certificates from './components/Certificates.jsx';
import Resume from './components/Resume.jsx';
import Footer from './components/Footer.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';
import AdminLogin from './components/admin/AdminLogin.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';

import './components/PanelGrid.css';

function Home() {
  const {hash} = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({behavior: 'smooth'});
  }, [hash]);
  return (
    <div className="main-content">
      <section className="snap-section"><Hero /></section>
      <section className="snap-section">
        <div className="bento-row"><About /></div>
      </section>
      <section className="snap-section"><Skills /></section>
      <section className="snap-section"><Projects /></section>
      <section className="snap-section"><Certificates /></section>
      <section className="snap-section"><Resume /></section>
      <section className="snap-section"><Contact /></section>
      <section className="foot"><Footer /></section>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        <Route
          path="/projects/:id"
          element={<><Sidebar /><ProjectDetail /></>}
        />
        <Route path="/" element={<><Sidebar /><Home /></>} />
      </Routes>
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
}
