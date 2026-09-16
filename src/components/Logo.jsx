import './Logo.css';

// A minimal, premium wordmark: a single glass panel with a soft gradient
// border, holding a bold gradient-filled "D". No idle motion — everything
// stays still until hovered, per the brief's "no bouncing, no rotating" rule.
export default function Logo({ size = 56 }) {
  return (
    <div className="logo-mark" style={{ width: size, height: size }}>
      <span className="logo-letter" style={{ fontSize: size * 0.6 }}>D</span>
    </div>
  );
}


