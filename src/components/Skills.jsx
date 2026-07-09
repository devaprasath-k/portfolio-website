import { FaCode } from 'react-icons/fa';
import { skills } from '../data/portfolioData.jsx';
import './PanelGrid.css';
import './Skills.css';

// Splits the skill list roughly in half so each marquee row shows a
// different set of cards, and duplicates each half so the loop is seamless
// (see Skills.css: the track animates by exactly -50%, one full copy).
const half = Math.ceil(skills.length / 2);
const rowA = skills.slice(0, half);
const rowB = skills.slice(half);

function MarqueeRow({ items, direction }) {
  return (
    <div className="marquee-wrap">
      <div className={`marquee-track ${direction === 'reverse' ? 'marquee-reverse' : ''}`}>
        {[...items, ...items].map((s, i) => (
          <div className="skill-card marquee-card card-surface" key={`${s.name}-${i}`}>
            <div className="skill-icon">{s.icon}</div>
            <h4>{s.name}</h4>
            <p className="text-dim">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills-full">
      <h3 className="section-title"><FaCode /> Skills &amp; Tools</h3>

      <MarqueeRow items={rowA} direction="forward" />
      <MarqueeRow items={rowB} direction="reverse" />
    </section>
  );
}
