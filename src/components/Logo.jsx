import './Logo.css';

// A glossy "Aqua" style D — a rounded glass gel shape with a bright top
// highlight (like light reflecting off wet glass) and a soft drop shadow,
// in the spirit of early Mac OS X's Aqua UI buttons.
const D_PATH = 'M30 18 H52 C70 18 82 32 82 50 C82 68 70 82 52 82 H30 Z';

export default function Logo({ size = 64 }) {
  return (
    <div className="logo-wrap" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="logo-svg">
        <defs>
          {/* Main body: deep purple at the bottom fading up to bright cyan */}
          <linearGradient id="aquaBody" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#5B21B6" />
            <stop offset="55%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#00E0FF" />
          </linearGradient>

          {/* The glossy highlight streak across the top third */}
          <linearGradient id="aquaShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <clipPath id="dClip">
            <path d={D_PATH} />
          </clipPath>
        </defs>

        {/* soft drop shadow ellipse under the button, gives it "floating glass" depth */}
        <ellipse cx="50" cy="90" rx="26" ry="5" className="logo-shadow" />

        {/* the glass gel body of the "D" */}
        <path d={D_PATH} fill="url(#aquaBody)" className="logo-body" />

        {/* glossy highlight streak, clipped so it never spills outside the D shape */}
        <ellipse cx="50" cy="26" rx="36" ry="15" fill="url(#aquaShine)" clipPath="url(#dClip)" className="logo-shine" />

        {/* small round specular dot, the classic Aqua-button catchlight */}
        <circle cx="38" cy="24" r="4" fill="#ffffff" opacity="0.8" />

        {/* thin glass rim so the edge reads crisp against any background */}
        <path d={D_PATH} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
