import React from 'react';

interface CrestLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const CrestLogo: React.FC<CrestLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_2px_12px_rgba(212,175,55,0.35)]"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#001F3F" />
            <stop offset="50%" stopColor="#002B5B" />
            <stop offset="100%" stopColor="#001428" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#997A15" />
          </linearGradient>
          <linearGradient id="tricolorOrange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="100%" stopColor="#E67300" />
          </linearGradient>
          <linearGradient id="tricolorGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#138808" />
            <stop offset="100%" stopColor="#0D5C06" />
          </linearGradient>
        </defs>

        {/* Outer Laurel Wreath Leaves (Left & Right) */}
        <g stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" opacity="0.85">
          {/* Left Wreath */}
          <path d="M22 68 C16 52 24 34 38 24" />
          <path d="M16 50 C20 48 24 54 22 58" fill="url(#goldGrad)" />
          <path d="M19 38 C24 37 27 44 24 47" fill="url(#goldGrad)" />
          <path d="M27 28 C32 29 34 36 30 39" fill="url(#goldGrad)" />
          {/* Right Wreath */}
          <path d="M98 68 C104 52 96 34 82 24" />
          <path d="M104 50 C100 48 96 54 98 58" fill="url(#goldGrad)" />
          <path d="M101 38 C96 37 93 44 96 47" fill="url(#goldGrad)" />
          <path d="M93 28 C88 29 86 36 90 39" fill="url(#goldGrad)" />
        </g>

        {/* Shield Border & Background */}
        <path
          d="M60 12 L92 24 V64 C92 86 60 108 60 108 C60 108 28 86 28 64 V24 L60 12 Z"
          fill="url(#shieldGrad)"
          stroke="url(#goldGrad)"
          strokeWidth="3.5"
        />

        {/* Inner Shield Inset Line */}
        <path
          d="M60 18 L86 28 V63 C86 81 60 99 60 99 C60 99 34 81 34 63 V28 L60 18 Z"
          fill="none"
          stroke="rgba(212,175,55,0.4)"
          strokeWidth="1.2"
        />

        {/* Tricolor Chevron at Top */}
        <path d="M48 22 L60 18 L72 22 L60 26 Z" fill="url(#tricolorOrange)" opacity="0.9" />
        <circle cx="60" cy="22" r="1.5" fill="#000080" />

        {/* Naval Fouled Anchor in Solid Gold */}
        <g fill="url(#goldGrad)" stroke="url(#goldGrad)">
          {/* Anchor Top Ring */}
          <circle cx="60" cy="36" r="6" strokeWidth="2.5" fill="none" />
          <circle cx="60" cy="36" r="2.5" fill="url(#goldGrad)" />

          {/* Anchor Stock (Horizontal crossbar) */}
          <rect x="42" y="44" width="36" height="4" rx="2" strokeWidth="1" />
          <circle cx="42" cy="46" r="2.5" />
          <circle cx="78" cy="46" r="2.5" />

          {/* Anchor Shank (Vertical shaft) */}
          <rect x="58" y="44" width="4" height="40" rx="1.5" strokeWidth="1" />

          {/* Anchor Crown & Arms (Curved base) */}
          <path
            d="M38 72 C44 88 76 88 82 72"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Fluke/Palm */}
          <polygon points="36,70 42,72 38,78" />
          {/* Right Fluke/Palm */}
          <polygon points="84,70 78,72 82,78" />

          {/* Anchor Fouled Rope winding around shank */}
          <path
            d="M59 38 C54 44 65 48 64 54 C63 60 55 64 58 70 C60 74 65 77 68 84"
            fill="none"
            stroke="#FFF2A3"
            strokeWidth="1.8"
            strokeDasharray="3 1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Star Accents */}
        <circle cx="60" cy="94" r="2.5" fill="url(#goldGrad)" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif tracking-widest text-white text-base font-bold uppercase leading-none">
            GCEK NAVAL NCC
          </span>
          <span className="text-[10px] tracking-wider text-amber-300/90 font-medium uppercase mt-0.5">
            Govt. College of Engg. Kalahandi
          </span>
        </div>
      )}
    </div>
  );
};
