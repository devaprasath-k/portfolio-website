import { FaFileAlt, FaDownload } from 'react-icons/fa';
import './Resume.css';
import resume from '../assets/Devaprasath_K_MERN_Resume.pdf';

export default function Resume() {
  return (
    <section id="resume" className="resume-full">
      <h3 className="section-title"><FaFileAlt /> Resume</h3>
      <div className="resume-viewer card-surface">
        <iframe
          title="Devaprasath K Resume"
          src="https://drive.google.com/file/d/1xS2yQp2Tb-TinKd2ppRR3V07KiEPiyHt/preview"
          width="100%"
          height="800"
          style={{ border: "none" }}
          className="resume-frame"
        />
        <a href={resume} download className="btn-primary-glow">
          <FaDownload /> Download Resume
        </a>
      </div>
    </section>
  );
}
