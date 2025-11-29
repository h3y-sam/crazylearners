import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Magnetic State
  const [magnetPos, setMagnetPos] = useState<{x: number, y: number} | null>(null);

  // Smooth physics
  const springConfig = { damping: 35, stiffness: 800 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      // If we are "magnetized", don't update with raw mouse position immediately for the visual
      if (!magnetPos) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      } else {
        // Sticky effect: pull towards the center of the element
        const strength = 0.2; // How much the mouse still influences position
        mouseX.set(magnetPos.x + (e.clientX - magnetPos.x) * strength);
        mouseY.set(magnetPos.y + (e.clientY - magnetPos.y) * strength);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('button, a, input, [role="button"]');
      
      if (clickable) {
        setIsHovering(true);
        // Calculate center for magnetic effect
        const rect = (clickable as HTMLElement).getBoundingClientRect();
        setMagnetPos({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        });
      } else {
        setIsHovering(false);
        setMagnetPos(null);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, magnetPos]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        animate={{
          scale: isClicked ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isClicked ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full 
          ${isHovering ? 'w-10 h-10 bg-neonBlue/80' : 'w-4 h-4 bg-neonBlue'}
        `}
      >
        {/* Glow Ring Effect on Click */}
        <AnimatePresence>
            {isClicked && (
                <motion.div
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-full bg-neonBlue blur-md"
                />
            )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Syllabus', path: '/syllabus' },
    { name: 'Materials', path: '/materials' },
    { name: 'MCQs & PYQs', path: '/mcq' },
    { name: 'Updates', path: '/updates' },
  ];

  const handleLogout = async () => {
    try {
        await logout();
        navigate('/login');
    } catch (error) {
        console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A0F24]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Rocket className="h-8 w-8 text-neonBlue" />
            <span className="font-display font-bold text-xl tracking-wider text-white">
              CRAZY<span className="text-neonBlue">LEARNERS</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-300 relative group py-2 ${
                      isActive ? 'text-neonBlue' : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neonBlue transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             {currentUser ? (
                <div className="flex items-center gap-4">
                     <span className="text-sm text-gray-400">Hi, {currentUser.email?.split('@')[0]}</span>
                     <div 
                        onClick={handleLogout}
                        className="p-2 rounded-full bg-white/5 border border-white/10 text-red-400 cursor-pointer hover:bg-white/10 transition"
                        title="Logout"
                     >
                        <LogOut size={20} />
                     </div>
                </div>
             ) : (
                <>
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-gray-300 hover:text-white font-medium text-sm transition-colors"
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => navigate('/login?mode=register')}
                        className="bg-neonBlue text-navy font-bold px-5 py-2 rounded-full hover:shadow-[0_0_15px_rgba(0,209,255,0.5)] transition-all duration-300 text-sm"
                    >
                        Register
                    </button>
                </>
             )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-4 rounded-md text-base font-medium ${
                      isActive ? 'text-neonBlue bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
               <div className="mt-4 px-3 space-y-3">
                 {currentUser ? (
                    <button 
                        onClick={handleLogout}
                        className="w-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold py-3 rounded-xl"
                    >
                        Logout
                    </button>
                 ) : (
                    <button 
                        onClick={() => { setIsOpen(false); navigate('/login'); }}
                        className="w-full bg-neonBlue text-navy font-bold py-3 rounded-xl"
                    >
                        Login / Register
                    </button>
                 )}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-navy text-gray-200 font-sans selection:bg-neonBlue/30 selection:text-white">
      <CustomCursor />
      <Navbar />
      <main className="relative z-10 pt-6">
        {children}
      </main>
      <footer className="mt-20 border-t border-white/10 bg-[#060918] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <Rocket className="h-6 w-6 text-neonBlue" />
                <span className="font-display font-bold text-lg text-white">CRAZYLEARNERS</span>
            </div>
            <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Crazy Learners. All rights reserved. <br/>
                Made for JEE & NEET Aspirants with ❤️ and ⚡
            </p>
        </div>
      </footer>
    </div>
  );
};