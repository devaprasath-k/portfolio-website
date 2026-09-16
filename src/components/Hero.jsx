import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiMongodb, SiMysql, SiLeetcode, SiHackerrank } from 'react-icons/si';
import vd from '../assets/working.mp4';
import './Hero.css';

const ORBIT_ICONS = [
  { icon: <FaJava />, top: '4%', left: '38%', color: '#f89820' },
  { icon: <FaReact />, top: '6%', left: '72%', color: '#61dafb' },
  { icon: <SiMongodb />, top: '38%', left: '6%', color: '#4DB33D' },
  { icon: <FaPython />, top: '58%', left: '10%', color: '#3776AB' },
  { icon: <SiMysql />, top: '78%', left: '78%', color: '#00758F' },
  { icon: <FaGitAlt />, top: '52%', left: '90%', color: '#F1502F' },
];

const SOCIAL_LINKS = [
  { icon: <FaGithub />, href: 'https://github.com/devaprasath-k', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/devaprasath-k-652347262/', label: 'LinkedIn' },
  { icon: <FaEnvelope />, href: 'mailto:devaprasathdev@gmail.com', label: 'Email' },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-left">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-badge glass"
        >
          Hello, I'm 👋
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-title"
        >
          Devaprasath <span className="gradient-text">K</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-subtitle"
        >
          Software Developer <span className="dot">|</span> MERN Stack Developer <span className="dot">|</span> Java Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-desc text-dim"
        >
          I build responsive web applications using the MERN Stack while continuously improving
          my skills in Java, Python, and Full Stack Development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hero-actions"
        >
          <a href="#projects" className="btn-primary-glow">View My Work →</a>
          <a href="/resume/Devaprasath_K_Resume.pdf" download className="btn-outline-glow">
            Download Resume ⬇
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hero-socials"
        >
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="hero-social-link">
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="hero-illustration-ring spin-slow" />
        <div className="hero-photo-frame">
          <video src={vd} className="hero-photo"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        {ORBIT_ICONS.map((o, i) => (
          <div key={i} className="orbit-icon float" style={{ top: o.top, left: o.left, color: o.color, animationDelay: `${i * 0.4}s` }}>
            {o.icon}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
