import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../utils/api.js';
import { projects as staticProjects } from '../data/portfolioData.jsx';
import './Projects.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(() => staticProjects.find((p) => p.id === id) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // Try the database first (real MongoDB _id); if that fails, fall back
    // to the static list (handles the old slug-style ids like "task-manager-app").
    api.get(`/projects/${id}`)
      .then(({ data }) => { if (!cancelled) setProject(data); })
      .catch(() => {
        if (!cancelled) setProject(staticProjects.find((p) => p.id === id) || null);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading && !project) {
    return <div className="main-content" style={{ paddingTop: 92 }}><p className="text-dim">Loading…</p></div>;
  }

  if (!project) {
    return (
      <div className="main-content" style={{ paddingTop: 92 }}>
        <p>Project not found.</p>
        <Link to="/" className="btn-outline-glow">Back home</Link>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ paddingTop: 92, paddingBottom: 60 }}>
      <Link to="/#projects" className="text-dim" style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginBottom: 20 }}>
        <FaArrowLeft /> Back to projects
      </Link>

      <div className="project-detail-thumb-wrap">
        {project.image?.url
          ? <img src={project.image.url} alt={project.name} />
          : <div className="project-thumb-placeholder" />}
      </div>

      <h1 className="gradient-text" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>{project.name}</h1>
      <div className="project-mini-tags" style={{ margin: '12px 0 20px' }}>
        {(project.tech || []).map((t) => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="project-card-actions" style={{ marginBottom: 30 }}>
        <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline-glow"><FaGithub /> Repository</a>
        <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary-glow"><FaExternalLinkAlt /> Live Demo</a>
      </div>

      {project.overview && (
        <div className="detail-section card-surface">
          <h3>Overview</h3>
          <p className="text-dim">{project.overview}</p>
        </div>
      )}
      {project.architecture && (
        <div className="detail-section card-surface">
          <h3>Architecture</h3>
          <p className="text-dim">{project.architecture}</p>
        </div>
      )}
      {project.features?.length > 0 && (
        <div className="detail-section card-surface">
          <h3>Features</h3>
          <ul className="text-dim">
            {project.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      )}
      {project.challenges && (
        <div className="detail-section card-surface">
          <h3>Challenges</h3>
          <p className="text-dim">{project.challenges}</p>
        </div>
      )}
      {project.database && (
        <div className="detail-section card-surface">
          <h3>Database Design</h3>
          <p className="text-dim">{project.database}</p>
        </div>
      )}
      {project.api?.length > 0 && (
        <div className="detail-section card-surface">
          <h3>API Endpoints</h3>
          <ul className="text-dim">
            {project.api.map((a) => <li key={a}><code>{a}</code></li>)}
          </ul>
        </div>
      )}
      {project.future && (
        <div className="detail-section card-surface">
          <h3>Future Improvements</h3>
          <p className="text-dim">{project.future}</p>
        </div>
      )}
    </div>
  );
}