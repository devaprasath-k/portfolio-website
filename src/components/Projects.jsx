import { useEffect, useState } from 'react';
import { FaFolderOpen, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api.js';
import { projects as staticProjects } from '../data/portfolioData.jsx';
import './PanelGrid.css';
import './Projects.css';

export default function Projects() {
  // Starts with the static fallback so the section is never empty while the
  // network request is in flight (or if the backend is temporarily down) —
  // then swaps in the real database content once it arrives.
  const [projects, setProjects] = useState(staticProjects);

  useEffect(() => {
    let cancelled = false;
    api.get('/projects')
      .then(({ data }) => { if (!cancelled && data.length > 0) setProjects(data); })
      .catch(() => { /* keep showing the static fallback */ });
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="projects" className="projects-full">
      <h3 className="section-title"><FaFolderOpen /> Projects</h3>
      <div className="projects-grid">
        {projects.map((p, i) => {
          const id = p._id || p.id;
          return (
            <motion.div
              key={id}
              className="project-card card-surface"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="project-thumb" />
              <div className="project-card-body">
                <h4>{p.name}</h4>
                <p className="text-dim">{p.short}</p>
                <div className="project-mini-tags">
                  {(p.tech || []).map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="project-card-actions">
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline-glow small"><FaGithub /> Code</a>
                  <a href={p.demo} target="_blank" rel="noreferrer" className="btn-outline-glow small"><FaExternalLinkAlt /> Demo</a>
                  <Link to={`/projects/${id}`} className="btn-primary-glow small">View Details</Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
