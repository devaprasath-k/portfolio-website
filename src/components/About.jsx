import { FaUser, FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaGraduationCap, FaBullseye, FaFolderOpen, FaCertificate, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PanelGrid.css';
import profile from '../assets/dp_image.png';
import Counter from './Counter.jsx';
import { skills, projects, certificates } from '../data/portfolioData.jsx';

const STATS = [
  { label: 'Projects', value: projects.length, icon: <FaFolderOpen /> },
  { label: 'Certificates', value: certificates.length, icon: <FaCertificate /> },
  { label: 'Technologies', value: skills.length, icon: <FaCode /> },
  { label: 'CGPA', value: 7.5, suffix: '', icon: <FaGraduationCap /> },
  { label: 'Years Learning', value: 3, suffix: '+', icon: <FaBullseye /> },
];

export default function About() {
  return (
    <motion.section
      id="about"
      className="panel card-surface"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="section-title"><FaUser /> About Me</h3>

      <div className="about-body">
        {/* Left: photo — rounded rectangle (not circle), gradient border,
            glass frame. The glow sits behind via ::before, the frame wraps
            the image directly, and the image fills the frame — that
            nesting is what makes every CSS rule below actually take effect. */}
        <div className="about-photo">
          <div className="about-photo-frame">
            <img src={profile} alt="Devaprasath K" className="profile-img" />
          </div>
        </div>

        {/* Right: intro, info grid, and animated stats — same content as
            before, just organized into distinct cards instead of stacked
            paragraphs. */}
        <div className="about-text">
          <p className="text-dim">
            I'm Devaprasath K, a recent Artificial Intelligence and Data Science graduate from
            Muthayammal Engineering College. I'm passionate about Full Stack Development and
            enjoy building scalable, user-friendly web applications using the MERN Stack. I
            continuously explore modern technologies and love solving real-world problems
            through clean, efficient code.
          </p>

          <ul className="about-meta">
            <li><FaMapMarkerAlt /> India</li>
            <li><FaBriefcase /> Fresher</li>
            <li><FaEnvelope /> devaprasathdev@gmail.com</li>
          </ul>

          <div className="about-info-grid">
            <div className="about-info-card">
              <h4><FaGraduationCap /> Education</h4>
              <p className="text-dim">
                B.E./B.Tech in Artificial Intelligence and DataScience —
                Muthayammal Engineering College, Graduated 2026, CGPA 7.5.
              </p>
            </div>
            <div className="about-info-card">
              <h4><FaBullseye /> Career Objective</h4>
              <p className="text-dim">
                To work as a MERN Stack / Full Stack Developer, applying my skills in React,
                Node.js, and Java to build scalable, real-world applications while
                continuously growing as an engineer.
              </p>
            </div>
          </div>

          <div className="about-stats">
            {STATS.map((s) => (
              <div className="about-stat" key={s.label}>
                <div className="about-stat-icon">{s.icon}</div>
                <div className="about-stat-value">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.label === 'CGPA' ? 1 : 0} />
                </div>
                <div className="about-stat-label text-dim">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}