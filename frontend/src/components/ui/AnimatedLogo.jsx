import React from 'react';
import logoSrc from '../../assets/medislot_logo.jpeg';

/**
 * AnimatedLogo — exact replica of medislot.niat.tech animation:
 *   1. pulseGlow  on the logo image  (0→5→0 blur, 2.2 s)
 *   2. ECG dot    travels the heartbeat path  (3 s)
 *   3. Sheen      diagonal shimmer sweeps across  (4 s)
 *
 * SVG coordinate space: 1024 × 664 (original canvas).
 * All animation sizes are scaled so they stay VISIBLE at any `height`.
 */
export default function AnimatedLogo({ height = 64 }) {
  const W = 1024;
  const H = 664;
  const displayW = Math.round(height * (W / H));

  // Scale so visual sizes stay constant regardless of display height
  const scale   = height / H;
  const dotR    = Math.round(6  / scale);   // ~6 px visible radius
  const dotBlur = Math.round(10 / scale);   // ~10 px visible glow

  const uid = React.useId().replace(/:/g, '');

  return (
    <svg
      width={displayW}
      height={height}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible', flexShrink: 0 }}
      aria-label="MediSlot AI"
    >
      <defs>

        {/* 1 ── pulseGlow: same values as medislot.niat.tech */}
        <filter id={`pg-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur">
            <animate
              attributeName="stdDeviation"
              values="0;5;0"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </feGaussianBlur>
          <feColorMatrix
            in="blur" type="matrix"
            values="0 0 0 0 0.3
                    0 0 0 0 0.95
                    0 0 0 0 1
                    0 0 0 1 0"
            result="glowColor"
          />
          <feMerge>
            <feMergeNode in="glowColor" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 2 ── dotGlow: scaled so it's visible at display size */}
        <filter id={`dg-${uid}`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation={dotBlur} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 3 ── sheen gradient */}
        <linearGradient id={`sh-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%"  stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="55%"  stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* ECG heartbeat motion path — same as medislot.niat.tech */}
        <path
          id={`ep-${uid}`}
          d="M230,372 L330,372 L400,372 L432,432 L462,188 L497,432 L533,372 L790,372"
          fill="none"
        />

      </defs>

      {/* ── Layer 1: logo image with pulsing cyan glow ── */}
      <image
        x="0" y="0"
        width={W} height={H}
        href={logoSrc}
        filter={`url(#pg-${uid})`}
        preserveAspectRatio="xMidYMid meet"
      />

      {/* ── Layer 2: diagonal sheen sweeping across ── */}
      <rect x="0" y="0" width={W} height={H} fill={`url(#sh-${uid})`}>
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`${-W},0; ${W * 2},0`}
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>

      {/* ── Layer 3: ECG glowing dot travelling the heartbeat path ── */}
      <circle r={dotR} fill="#4df8ff" filter={`url(#dg-${uid})`}>
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href={`#ep-${uid}`} />
        </animateMotion>
      </circle>

    </svg>
  );
}
