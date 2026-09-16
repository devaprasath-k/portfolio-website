import { FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import education from '../data/education.js';
import './Timeline.css';

export default function Education() {
  // Reversed so the most recent (the degree) shows first, oldest last.
  const items = [...education].reverse();

  return (
    <section id="education" className="timeline-section">
      <h3 className="section-title"><FaGraduationCap /> Education</h3>

      <div className="timeline-simple">
        <div className="timeline-simple-line" />

        {items.map((item, i) => (
          <motion.div
            className="timeline-simple-row"
            key={item.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className="timeline-simple-marker" />
            <span className="timeline-simple-stub" />
            <div className="timeline-simple-card card-surface">
              <h4>{item.title}</h4>
              <p className="timeline-simple-sub text-dim">{item.institution} &middot; {item.period}</p>
              {item.detail && <p className="timeline-simple-detail text-dim">{item.detail}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}