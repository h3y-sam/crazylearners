import React from 'react';
import { motion } from 'framer-motion';

// --- Glass Card ---
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, boxShadow: '0 10px 30px -10px rgba(0, 209, 255, 0.2)' } : {}}
      className={`glass-panel rounded-3xl p-6 relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-neonBlue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// --- Neon Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-neonBlue text-navy hover:bg-white hover:shadow-[0_0_20px_rgba(0,209,255,0.6)]",
    secondary: "bg-glassBorder text-white hover:bg-white/10 border border-white/5",
    outline: "border border-neonBlue/50 text-neonBlue hover:bg-neonBlue/10"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 -skew-x-12 translate-x-[-150%] group-hover:animate-[shimmer_1s_infinite]" />
      )}
    </button>
  );
};

// --- Status Badge ---
export const Badge: React.FC<{ children: React.ReactNode; type?: 'success' | 'warning' | 'info' }> = ({ children, type = 'info' }) => {
  const colors = {
    success: "bg-neonGreen/20 text-neonGreen border-neonGreen/30",
    warning: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    info: "bg-neonBlue/20 text-neonBlue border-neonBlue/30"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[type]}`}>
      {children}
    </span>
  );
};
