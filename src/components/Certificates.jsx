import { FaCertificate, FaEye, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Timeline.css';
import { certificates } from '../data/portfolioData';
import './Certificates.css';

export default function Certificates() {
  return (
    <section id="certificates" className="timeline-section">
      <h3 className="section-title"><FaCertificate /> Certificates</h3>

      <div className="timeline-simple">
        <div className="timeline-simple-line" />

        {certificates.map((cert, i) => (
          <motion.div
            className="timeline-simple-row"
            key={cert.credentialId || cert.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <span className="timeline-simple-marker" />
            <span className="timeline-simple-stub" />

            <div className="timeline-simple-card card-surface cert-simple-card">
              <div className="cert-simple-thumb">
                {cert.image
                  ? <img src={cert.image} alt={cert.title} loading="lazy" />
                  : <div className="cert-thumb-placeholder"><FaCertificate /></div>}
              </div>

              <div className="cert-simple-body">
                <h4>{cert.title}</h4>
                <p className="timeline-simple-sub text-dim">
                  {cert.issuer} &middot; {cert.date}
                  {cert.credentialId && <> &middot; ID: {cert.credentialId}</>}
                </p>

                {cert.tags?.length > 0 && (
                  <div className="cert-tags">
                    {cert.tags.map((t) => <span className="cert-tag" key={t}>{t}</span>)}
                  </div>
                )}

                <div className="cert-actions">
                  {cert.image && (
                    <a href={cert.image} target="_blank" rel="noreferrer" className="cert-btn">
                      <FaEye /> View
                    </a>
                  )}
                  {cert.pdf && (
                    <a href={cert.pdf} download className="cert-btn">
                      <FaDownload /> Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}