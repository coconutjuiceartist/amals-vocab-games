/**
 * The mascot: an expressive SVG magical cat with moods, poses, and shop hats.
 * She names it on first run.
 */

export type MascotPose = 'happy' | 'excited' | 'thinking' | 'sleepy' | 'proud' | 'surprised' | 'sad';

const HATS: Record<string, JSX.Element> = {
  none: <g />,
  wizard: (
    <g>
      <polygon points="100,2 76,46 124,46" fill="#5b21b6" stroke="#4c1d95" strokeWidth="2" />
      <ellipse cx="100" cy="46" rx="30" ry="7" fill="#5b21b6" stroke="#4c1d95" strokeWidth="2" />
      <text x="92" y="36" fontSize="14">✨</text>
    </g>
  ),
  beret: (
    <g>
      <ellipse cx="98" cy="38" rx="26" ry="11" fill="#9d2463" />
      <circle cx="98" cy="28" r="4" fill="#7a1b4d" />
    </g>
  ),
  crown: (
    <g>
      <polygon points="78,42 84,24 94,38 102,22 110,38 120,24 124,42" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <circle cx="102" cy="20" r="3" fill="#fb7185" />
    </g>
  ),
  headphones: (
    <g>
      <path d="M 72 52 Q 100 18 128 52" fill="none" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />
      <rect x="64" y="48" width="14" height="20" rx="6" fill="#0ea5e9" />
      <rect x="122" y="48" width="14" height="20" rx="6" fill="#0ea5e9" />
    </g>
  ),
  scarf: <g />,
  flowercrown: (
    <g fontSize="13">
      <text x="74" y="44">🌸</text>
      <text x="92" y="38">🌼</text>
      <text x="110" y="44">🌸</text>
    </g>
  ),
};

export function Mascot({
  pose = 'happy',
  size = 120,
  hat = 'none',
  bob = true,
}: {
  pose?: MascotPose;
  size?: number;
  hat?: string;
  bob?: boolean;
}) {
  const eyes = (() => {
    switch (pose) {
      case 'sleepy': return (
        <g>
          <path d="M 80 86 Q 86 92 92 86" stroke="#1f1235" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 108 86 Q 114 92 120 86" stroke="#1f1235" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
      case 'thinking': return (
        <g>
          <circle cx="86" cy="86" r="5" fill="#1f1235" />
          <circle cx="114" cy="84" r="5" fill="#1f1235" />
          <circle cx="87.5" cy="84.5" r="1.7" fill="#fff" />
          <circle cx="115.5" cy="82.5" r="1.7" fill="#fff" />
        </g>
      );
      case 'surprised': return (
        <g>
          <circle cx="86" cy="85" r="7.5" fill="#1f1235" />
          <circle cx="114" cy="85" r="7.5" fill="#1f1235" />
          <circle cx="88" cy="82" r="2.6" fill="#fff" />
          <circle cx="116" cy="82" r="2.6" fill="#fff" />
        </g>
      );
      case 'sad': return (
        <g>
          <circle cx="86" cy="87" r="5.5" fill="#1f1235" />
          <circle cx="114" cy="87" r="5.5" fill="#1f1235" />
          <circle cx="87" cy="85" r="1.8" fill="#fff" />
          <circle cx="115" cy="85" r="1.8" fill="#fff" />
          <path d="M 78 78 L 92 82" stroke="#1f1235" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 122 78 L 108 82" stroke="#1f1235" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );
      default: return (
        <g>
          <circle cx="86" cy="86" r="6" fill="#1f1235" />
          <circle cx="114" cy="86" r="6" fill="#1f1235" />
          <circle cx="88" cy="83.5" r="2" fill="#fff" />
          <circle cx="116" cy="83.5" r="2" fill="#fff" />
        </g>
      );
    }
  })();

  const mouth = (() => {
    switch (pose) {
      case 'excited':
      case 'proud':
        return <path d="M 90 100 Q 100 112 110 100" stroke="#1f1235" strokeWidth="3" fill="#7a3b52" strokeLinecap="round" />;
      case 'sad':
        return <path d="M 92 106 Q 100 99 108 106" stroke="#1f1235" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case 'surprised':
        return <ellipse cx="100" cy="103" rx="6" ry="8" fill="#7a3b52" />;
      case 'thinking':
        return <path d="M 93 103 Q 100 106 107 102" stroke="#1f1235" strokeWidth="3" fill="none" strokeLinecap="round" />;
      default:
        return (
          <g>
            <path d="M 100 96 Q 95 104 89 100" stroke="#1f1235" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            <path d="M 100 96 Q 105 104 111 100" stroke="#1f1235" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </g>
        );
    }
  })();

  return (
    <svg
      viewBox="0 0 200 190"
      width={size}
      height={size * 0.95}
      className={bob ? 'mascot-bob' : ''}
      aria-label="mascot"
    >
      {/* tail */}
      <path d="M 152 150 Q 185 140 178 105 Q 174 88 162 92" fill="none" stroke="#8d6bdb" strokeWidth="13" strokeLinecap="round" />
      <path d="M 162 92 Q 172 86 178 95" fill="none" stroke="#ffd166" strokeWidth="13" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="100" cy="142" rx="48" ry="38" fill="#8d6bdb" />
      <ellipse cx="100" cy="152" rx="30" ry="24" fill="#cdb9f7" />
      {/* paws */}
      <ellipse cx="74" cy="172" rx="13" ry="9" fill="#7a58c9" />
      <ellipse cx="126" cy="172" rx="13" ry="9" fill="#7a58c9" />
      {/* ears */}
      <polygon points="68,62 78,30 96,54" fill="#8d6bdb" />
      <polygon points="132,62 122,30 104,54" fill="#8d6bdb" />
      <polygon points="74,57 80,38 92,53" fill="#f5a8c9" />
      <polygon points="126,57 120,38 108,53" fill="#f5a8c9" />
      {/* head */}
      <circle cx="100" cy="86" r="40" fill="#9d7ee8" />
      <circle cx="100" cy="94" r="30" fill="#cdb9f7" opacity="0.55" />
      {/* star mark */}
      <text x="93" y="64" fontSize="13">⭐</text>
      {/* whiskers */}
      <g stroke="#e9def9" strokeWidth="2" strokeLinecap="round">
        <line x1="58" y1="92" x2="76" y2="94" />
        <line x1="58" y1="100" x2="76" y2="99" />
        <line x1="142" y1="92" x2="124" y2="94" />
        <line x1="142" y1="100" x2="124" y2="99" />
      </g>
      {eyes}
      {/* nose */}
      <polygon points="96,94 104,94 100,99" fill="#f5a8c9" />
      {mouth}
      {/* blush for proud/excited */}
      {(pose === 'proud' || pose === 'excited') && (
        <g fill="#f5a8c9" opacity="0.7">
          <ellipse cx="72" cy="96" rx="6" ry="4" />
          <ellipse cx="128" cy="96" rx="6" ry="4" />
        </g>
      )}
      {/* knitted scarf (default accessory — a nod to her knitting) */}
      <path d="M 70 118 Q 100 132 130 118 L 128 130 Q 100 142 72 130 Z" fill="#fb7185" />
      <rect x="116" y="124" width="12" height="26" rx="5" fill="#fb7185" />
      <g stroke="#e35d72" strokeWidth="1.6">
        <line x1="74" y1="124" x2="128" y2="124" />
        <line x1="118" y1="132" x2="128" y2="132" />
        <line x1="118" y1="140" x2="128" y2="140" />
      </g>
      {HATS[hat] ?? null}
    </svg>
  );
}
