import { useEffect, useRef, useState } from 'react';

interface AnimatedIconProps {
  type: 'unlock' | 'document' | 'shield' | 'user' | 'success' | 'problem';
  size?: number;
}

export default function AnimatedIcon({ type, size = 64 }: AnimatedIconProps) {
  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (iconRef.current) {
      observer.observe(iconRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const icons = {
    unlock: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`${isVisible ? 'animate-unlock' : ''}`}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#E67E22', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#F39C12', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect x="16" y="28" width="32" height="28" rx="4" fill="url(#grad1)" className="animate-pulse-slow" />
        <path d="M32 38 L32 44" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="36" r="3" fill="white" />
        <path d="M24 28 L24 18 C24 13.6 27.6 10 32 10 C36.4 10 40 13.6 40 18 L40 22" 
          stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" className="animate-swing" />
      </svg>
    ),
    document: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`${isVisible ? 'animate-float' : ''}`}>
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3498DB', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2E86C1', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect x="16" y="8" width="32" height="48" rx="3" fill="url(#grad2)" />
        <path d="M38 8 L38 18 L48 18 Z" fill="#2874A6" />
        <line x1="22" y1="24" x2="42" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-draw-line" />
        <line x1="22" y1="32" x2="38" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-draw-line" style={{ animationDelay: '0.2s' }} />
        <line x1="22" y1="40" x2="42" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-draw-line" style={{ animationDelay: '0.4s' }} />
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`${isVisible ? 'animate-shield-pop' : ''}`}>
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#27AE60', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#229954', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path d="M32 8 L48 16 L48 32 C48 44 40 52 32 56 C24 52 16 44 16 32 L16 16 Z" 
          fill="url(#grad3)" className="animate-pulse-slow" />
        <path d="M24 32 L29 37 L40 24" stroke="white" strokeWidth="3" strokeLinecap="round" 
          strokeLinejoin="round" className="animate-check-draw" />
      </svg>
    ),
    user: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`${isVisible ? 'animate-float' : ''}`}>
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#E67E22', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#F39C12', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle cx="22" cy="20" r="7" fill="url(#grad4)" className="animate-pulse-slow" />
        <circle cx="42" cy="20" r="7" fill="url(#grad4)" className="animate-pulse-slow" style={{ animationDelay: '0.2s' }} />
        <path d="M14 44 C14 36 17 30 22 30 C27 30 30 33 32 36 C34 33 37 30 42 30 C47 30 50 36 50 44" 
          stroke="url(#grad4)" strokeWidth="6" strokeLinecap="round" className="animate-draw-arc" />
        <path d="M28 32 Q32 38 36 32" stroke="url(#grad4)" strokeWidth="4" strokeLinecap="round" 
          fill="none" className="animate-pulse-slow" style={{ animationDelay: '0.4s' }} />
      </svg>
    ),
    success: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`${isVisible ? 'animate-success-pop' : ''}`}>
        <defs>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#27AE60', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1E8449', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="24" fill="url(#grad5)" className="animate-scale-in" />
        <path d="M20 32 L28 40 L44 24" stroke="white" strokeWidth="4" strokeLinecap="round" 
          strokeLinejoin="round" className="animate-check-draw" />
      </svg>
    ),
    problem: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`${isVisible ? 'animate-shake' : ''}`}>
        <defs>
          <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#E74C3C', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#C0392B', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="24" fill="url(#grad6)" className="animate-pulse-slow" />
        <path d="M24 24 L40 40 M40 24 L24 40" stroke="white" strokeWidth="4" strokeLinecap="round" 
          className="animate-x-draw" />
      </svg>
    )
  };

  return (
    <div ref={iconRef} className="flex items-center justify-center">
      {icons[type]}
    </div>
  );
}