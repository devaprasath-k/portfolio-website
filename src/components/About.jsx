import { FaUser, FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaGraduationCap, FaBullseye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PanelGrid.css';
import profile from '../assets/dp_image.png';

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

          <p className="text-dim">
            <FaGraduationCap /><strong>Education:</strong> B.E./B.Tech in [Artificial Intelligence and DataScience] —
            [Muthayammal Engineering College], Graduated [2026], CGPA [7.5].
          </p>

          <p className="text-dim">
            <FaBullseye /><strong>Career Objective:</strong> To work as a MERN Stack / Full
            Stack Developer, applying my skills in React, Node.js, and Java to build
            scalable, real-world applications while continuously growing as an engineer.
          </p>
        </div>

        {/* The glow sits behind (::before, see CSS), the frame wraps the
            image directly, and the image fills the frame — that nesting is
            what makes every CSS rule below actually take effect. */}
        <div className="about-photo">
          <div className="about-photo-frame">
            <img src={profile} alt="Devaprasath K" className="profile-img" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
