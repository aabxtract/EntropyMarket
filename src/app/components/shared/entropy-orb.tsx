'use client';

import { cn } from "@/lib/utils";

type EntropyOrbProps = {
  purity: number;
  className?: string;
};

const EntropyOrb = ({ purity, className }: EntropyOrbProps) => {
  const glowOpacity = purity / 100 * 0.5 + 0.2;
  const size = purity / 100 * 80 + 20; // size from 20 to 100
  const color = purity > 80 ? 'var(--tw-color-accent)' : `hsl(var(--primary), ${purity/100})`;

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5%); }
        }
        @keyframes noise {
          0%, 100% { background-position: 0 0; }
          50% { background-position: 50% 50%; }
        }
        .noise-overlay {
          background-image: linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                            linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%),
                            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%);
          background-size: 2px 2px;
          animation: noise 3s linear infinite;
        }
      `}</style>
      <div className={cn("relative flex items-center justify-center", className)}>
        <div 
          className="relative rounded-full"
          style={{ 
            width: size, 
            height: size, 
            animation: 'float 6s ease-in-out infinite' 
          }}
        >
          {/* Main orb body */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
            }}
          />
          {/* Inner glow */}
          <div 
            className="absolute inset-[10%] rounded-full opacity-50"
            style={{
              background: `radial-gradient(circle, white 0%, ${color} 50%, transparent 70%)`,
              animation: 'pulse 4s ease-in-out infinite'
            }}
          />
          {/* Noise overlay */}
          <div className="noise-overlay absolute inset-0 rounded-full opacity-50" />
          {/* Outer Glow */}
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background: color,
              opacity: glowOpacity,
              animation: `pulse 3s ease-in-out infinite reverse`
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EntropyOrb;
