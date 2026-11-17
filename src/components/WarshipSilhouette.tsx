import React from 'react';

interface WarshipSilhouetteProps {
  className?: string;
  opacity?: number;
}

export const WarshipSilhouette: React.FC<WarshipSilhouetteProps> = ({
  className = '',
  opacity = 0.25,
}) => {
  return (
    <svg
      viewBox="0 0 1000 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="shipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0077B6" stopOpacity="0.1" />
          <stop offset="30%" stopColor="#48CAE4" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0077B6" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Horizon Baseline & Grid */}
      <line x1="0" y1="180" x2="1000" y2="180" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" opacity="0.3" />
      <line x1="0" y1="195" x2="1000" y2="195" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />

      {/* Main Warship Hull (Guided Missile Destroyer Silhouette) */}
      <path
        d="M 120 180 
           L 180 180 
           L 240 172 
           L 320 172 
           L 380 152 
           L 440 152 
           L 460 135 
           L 475 135 
           L 475 105 
           L 490 105 
           L 495 70 
           L 505 70 
           L 510 105 
           L 535 105 
           L 540 120 
           L 570 120 
           L 580 85 
           L 590 85 
           L 595 120 
           L 660 120 
           L 680 145 
           L 750 145 
           L 780 162 
           L 870 170 
           L 930 180 
           L 120 180 Z"
        fill="url(#shipGrad)"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Main Radar Mast & Antenna Spire */}
      <line x1="500" y1="70" x2="500" y2="40" stroke="currentColor" strokeWidth="2" />
      <line x1="485" y1="52" x2="515" y2="52" stroke="currentColor" strokeWidth="1.5" />
      <line x1="490" y1="44" x2="510" y2="44" stroke="currentColor" strokeWidth="1" />
      <circle cx="500" cy="38" r="3" fill="#D4AF37" />

      {/* Aft Secondary Radar Mast */}
      <line x1="585" y1="85" x2="585" y2="55" stroke="currentColor" strokeWidth="1.5" />
      <line x1="575" y1="65" x2="595" y2="65" stroke="currentColor" strokeWidth="1.2" />

      {/* Forward Naval Gun Turret (76mm / 127mm OTO Melara) */}
      <path d="M 830 170 L 850 170 L 845 160 L 832 160 Z" fill="currentColor" opacity="0.6" />
      <line x1="845" y1="162" x2="880" y2="158" stroke="currentColor" strokeWidth="2.5" />

      {/* VLS (Vertical Launch Missile Silo) Cells on Foredeck */}
      <rect x="740" y="162" width="55" height="4" fill="currentColor" opacity="0.4" />
      <line x1="750" y1="162" x2="750" y2="166" stroke="#D4AF37" strokeWidth="1" />
      <line x1="765" y1="162" x2="765" y2="166" stroke="#D4AF37" strokeWidth="1" />
      <line x1="780" y1="162" x2="780" y2="166" stroke="#D4AF37" strokeWidth="1" />

      {/* Helicopter Hangar & Flight Deck on Stern */}
      <rect x="330" y="160" width="80" height="12" fill="currentColor" opacity="0.4" />
      <line x1="220" y1="172" x2="330" y2="172" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />

      {/* Bow Wave & Ocean Wake */}
      <path
        d="M 930 180 C 950 182 970 188 995 194"
        stroke="#48CAE4"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 915 183 C 940 186 965 193 990 200"
        stroke="#48CAE4"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 120 180 C 90 183 60 188 15 195"
        stroke="#0077B6"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};
