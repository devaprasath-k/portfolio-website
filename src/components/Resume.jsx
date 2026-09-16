import { FaFileAlt, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Resume.css';
import RESUME_PATH from '../assets/Devaprasath_K_MERN_Resume.pdf';

export default function Resume() {
  return (
    <section id="resume" className="resume-full">
      <h3 className="section-title"><FaFileAlt /> Resume</h3>

      <motion.div
        className="resume-viewer glass"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left: PDF preview, right: info + actions — on desktop these sit
            side by side and actually use the available width, instead of
            everything being squeezed into one centered narrow column. */}
        <div className="resume-frame-wrap">
          <iframe title="Devaprasath K Resume" src={RESUME_PATH} className="resume-frame" />
        </div>

        <div className="resume-info">
          <h4>Devaprasath K — MERN Stack Developer</h4>
          <p className="text-dim">
            A one-page summary of my education, skills, and project experience —
            open the full preview or download the PDF to keep a copy.
          </p>
          <div className="resume-actions">
            <a href={RESUME_PATH} target="_blank" rel="noreferrer" className="btn-outline-glow">
              <FaExternalLinkAlt /> View Full Screen
            </a>
            <a href={RESUME_PATH} download className="btn-primary-glow">
              <FaDownload /> Download Resume
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}