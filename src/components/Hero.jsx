import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt, FaLaptopCode } from 'react-icons/fa';
import { SiMongodb, SiMysql } from 'react-icons/si';
import './Hero.css';

const ORBIT_ICONS = [
  { icon: <FaJava />, top: '4%', left: '38%', color: '#f89820' },
  { icon: <FaReact />, top: '6%', left: '72%', color: '#61dafb' },
  { icon: <SiMongodb />, top: '38%', left: '6%', color: '#4DB33D' },
  { icon: <FaPython />, top: '58%', left: '10%', color: '#3776AB' },
  { icon: <SiMysql />, top: '78%', left: '78%', color: '#00758F' },
  { icon: <FaGitAlt />, top: '52%', left: '90%', color: '#F1502F' },
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
          <a href="https://collection.cloudinary.com/sf9xcpxc/efd7d246ec71a0cad68fdf473297ede5" download className="btn-outline-glow">
            Download Resume ⬇
          </a>
        </motion.div>
      </div>

      <div className="hero-right">
        <div className="hero-illustration-ring spin-slow" />
        <div className="hero-illustration glass">
          <FaLaptopCode className="illustration-icon" />
          <p className="text-dim" style={{ marginTop: 10 }}>Devaprasath Open to work</p>
        </div>
        {ORBIT_ICONS.map((o, i) => (
          <div key={i} className="orbit-icon float" style={{ top: o.top, left: o.left, color: o.color, animationDelay: `${i * 0.4}s` }}>
            {o.icon}
          </div>
        ))}
      </div>
    </section>
  );
}
