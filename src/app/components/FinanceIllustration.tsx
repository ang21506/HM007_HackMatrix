import { CreditCard, TrendingUp, PiggyBank, Lock, Zap, Globe } from 'lucide-react';
import { useState } from 'react';

export function FinanceIllustration() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const calculateParallax = (elementX: number, elementY: number, offset: number = 0.03) => {
    const container = document.querySelector('[data-illustration-container]') as HTMLElement;
    if (!container) return { x: 0, y: 0 };

    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distX = (mousePos.x - centerX) * offset;
    const distY = (mousePos.y - centerY) * offset;

    return { x: distX, y: distY };
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden cursor-pointer"
      data-illustration-container
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIcon(null)}
    >
      {/* Base gradient background - CreditWise Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />

      {/* Animated background elements */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotate, 0deg)); }
          50% { transform: translateY(-20px) rotate(var(--rotate, 0deg)); }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(100%) skewX(-20deg); }
        }
        
        .icon-floating {
          animation: float 4s ease-in-out infinite;
        }
        .icon-float-delay-1 { animation-delay: 0s; }
        .icon-float-delay-2 { animation-delay: 0.5s; }
        .icon-float-delay-3 { animation-delay: 1s; }
        .icon-float-delay-4 { animation-delay: 1.5s; }
        .icon-float-delay-5 { animation-delay: 2s; }
        .icon-float-delay-6 { animation-delay: 2.5s; }
        
        .icon-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .icon-hover:hover {
          filter: brightness(1.3) drop-shadow(0 0 15px currentColor);
        }

        .circle-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Top-left: Credit Card icon with animation */}
      <div
        className="absolute top-20 left-16 opacity-0 transform -rotate-12 icon-floating icon-float-delay-1 icon-hover transition-all hover:scale-110"
        onMouseEnter={() => setHoveredIcon('card')}
        style={{
          animation: hoveredIcon === 'card' ? 'none' : 'float 4s ease-in-out infinite',
          opacity: hoveredIcon === 'card' ? 0.25 : 0.15,
        }}
      >
        <CreditCard size={120} className="text-blue-400" strokeWidth={1} />
      </div>

      {/* Top-right: Trending Up icon */}
      <div
        className="absolute top-10 right-20 opacity-0 transform rotate-12 icon-floating icon-float-delay-2 icon-hover transition-all hover:scale-110"
        onMouseEnter={() => setHoveredIcon('trend')}
        style={{
          animation: hoveredIcon === 'trend' ? 'none' : 'float 4s ease-in-out infinite 0.5s',
          opacity: hoveredIcon === 'trend' ? 0.25 : 0.15,
        }}
      >
        <TrendingUp size={100} className="text-green-400" strokeWidth={1} />
      </div>

      {/* Middle-left: Piggy Bank icon */}
      <div
        className="absolute top-1/3 left-8 opacity-0 icon-floating icon-float-delay-3 icon-hover transition-all hover:scale-110"
        onMouseEnter={() => setHoveredIcon('save')}
        style={{
          animation: hoveredIcon === 'save' ? 'none' : 'float 4s ease-in-out infinite 1s',
          opacity: hoveredIcon === 'save' ? 0.25 : 0.12,
        }}
      >
        <PiggyBank size={110} className="text-pink-400" strokeWidth={1} />
      </div>

      {/* Middle-right: Lock icon */}
      <div
        className="absolute top-1/2 right-16 opacity-0 transform rotate-45 icon-floating icon-float-delay-4 icon-hover transition-all hover:scale-110"
        onMouseEnter={() => setHoveredIcon('secure')}
        style={{
          animation: hoveredIcon === 'secure' ? 'none' : 'float 4s ease-in-out infinite 1.5s',
          opacity: hoveredIcon === 'secure' ? 0.25 : 0.15,
        }}
      >
        <Lock size={95} className="text-purple-400" strokeWidth={1} />
      </div>

      {/* Bottom-left: Zap icon */}
      <div
        className="absolute bottom-24 left-12 opacity-0 transform -rotate-12 icon-floating icon-float-delay-5 icon-hover transition-all hover:scale-110"
        onMouseEnter={() => setHoveredIcon('power')}
        style={{
          animation: hoveredIcon === 'power' ? 'none' : 'float 4s ease-in-out infinite 2s',
          opacity: hoveredIcon === 'power' ? 0.25 : 0.12,
        }}
      >
        <Zap size={100} className="text-yellow-400" strokeWidth={1} />
      </div>

      {/* Bottom-right: Globe icon */}
      <div
        className="absolute bottom-16 right-12 opacity-0 icon-floating icon-float-delay-6 icon-hover transition-all hover:scale-110"
        onMouseEnter={() => setHoveredIcon('globe')}
        style={{
          animation: hoveredIcon === 'globe' ? 'rotate 8s linear infinite' : 'float 4s ease-in-out infinite 2.5s',
          opacity: hoveredIcon === 'globe' ? 0.25 : 0.15,
        }}
      >
        <Globe size={120} className="text-cyan-400" strokeWidth={1} />
      </div>

      {/* Decorative animated circles */}
      <div className="absolute top-1/4 left-1/3 opacity-0 circle-glow" style={{ opacity: hoveredIcon ? 0.15 : 0.08 }}>
        <div className="w-40 h-40 rounded-full border-2 border-blue-400 flex items-center justify-center animate-pulse">
          <span className="text-3xl font-bold text-blue-400">₹</span>
        </div>
      </div>

      <div className="absolute bottom-1/3 right-1/4 opacity-0 circle-glow" style={{ opacity: hoveredIcon ? 0.15 : 0.08 }}>
        <div className="w-32 h-32 rounded-full border-2 border-green-400 flex items-center justify-center animate-bounce">
          <span className="text-2xl font-bold text-green-400">%</span>
        </div>
      </div>

      {/* Animated gradient overlay lines */}
      <div className="absolute inset-0">
        {/* Horizontal line with animation */}
        <div className="absolute top-1/3 left-0 right-0 h-px opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        </div>

        {/* Vertical line with animation */}
        <div className="absolute top-0 bottom-0 left-1/3 w-px opacity-20">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent" />
        </div>

        {/* Diagonal line */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(135deg, transparent 48%, rgba(59, 130, 246, 0.3) 50%, transparent 52%)',
          }}
        />
      </div>

      {/* Interactive overlay with shimmer effect on hover */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hoveredIcon
            ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 230, 207, 0.1) 100%)'
            : 'linear-gradient(to br, rgba(15, 23, 42, 0.4) 0%, rgba(30, 24, 58, 0.2) 50%, rgba(15, 23, 42, 0.4) 100%)',
        }}
      />

      {/* Top shine effect with animation */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 opacity-10">
        <div className="w-full h-full bg-gradient-to-b from-white to-transparent blur-3xl animate-pulse" />
      </div>

      {/* Bottom shine effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 opacity-5">
        <div className="w-full h-full bg-gradient-to-t from-cyan-400 to-transparent blur-3xl" />
      </div>

      {/* Animated grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(79, 172, 254, 0.05) 25%, rgba(79, 172, 254, 0.05) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, 0.05) 75%, rgba(79, 172, 254, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(79, 172, 254, 0.05) 25%, rgba(79, 172, 254, 0.05) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, 0.05) 75%, rgba(79, 172, 254, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '60px 60px',
          opacity: hoveredIcon ? 0.1 : 0.05,
        }}
      />
    </div>
  );
}
