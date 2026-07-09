import { useEffect, useRef, useState } from 'react';
import { FaCertificate, FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import api from '../utils/api.js';
import { certificates as staticCertificates } from '../data/portfolioData.jsx';
import './Certificates.css';

const AUTOPLAY_MS = 4000;

export default function Certificates() {
  const [certificates, setCertificates] = useState(staticCertificates);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    api.get('/certificates')
      .then(({ data }) => { if (!cancelled && data.length > 0) setCertificates(data); })
      .catch(() => { /* keep showing the static fallback */ });
    return () => { cancelled = true; };
  }, []);

  const next = () => setIndex((i) => (i + 1) % certificates.length);
  const prev = () => setIndex((i) => (i - 1 + certificates.length) % certificates.length);

  // Autoplay: advances one slide every AUTOPLAY_MS, unless paused
  // (paused becomes true while the mouse is over the carousel).
  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, certificates.length]);

  return (
    <section id="certificates" className="certificates-full">
      <h3 className="section-title"><FaCertificate /> Certificates</h3>

      <div
        className="cert-carousel card-surface"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button className="cert-nav" onClick={prev} aria-label="Previous"><FaChevronLeft /></button>

        <div className="cert-viewport">
          <div className="cert-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {certificates.map((cert) => (
              <div className="cert-slide" key={cert._id || cert.title}>
                <div className="cert-preview">
                  <img src="https://www.hackerrank.com/certificates/iframe/52defb77ff60" alt="" />
                  </div>
                <h4>{cert.title}</h4>
                <p className="text-dim">Issued by {cert.issuer}</p>
                <a href={cert.verifyLink || cert.link} target="_blank" rel="noreferrer" className="btn-outline-glow small">
                  <FaCheckCircle /> Verify
                </a>
              </div>
            ))}
          </div>
        </div>

        <button className="cert-nav" onClick={next} aria-label="Next"><FaChevronRight /></button>
      </div>

      <div className="cert-dots">
        {certificates.map((c, i) => (
          <span key={c._id || c.title} className={`cert-dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </section>
  );
}
