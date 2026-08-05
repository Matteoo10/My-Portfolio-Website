import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Send,
  Briefcase,
  Code2,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll progress bar — GSAP ScrollTrigger scrub, consistent with the rest
  // of the site's scroll-linked animations. No raw scroll listener involved.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!progressRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#f5f5f0]/90 backdrop-blur-md border-b border-[#e0e0d8]">
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="absolute top-0 left-0 h-[2px] w-full bg-[#0a0a0a] origin-left"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Available Badge + Brand */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick('hero')}>
          {/* Availability dot badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#0a0a0a] border border-[#d0d0c8] rounded-full px-3 py-1 bg-white/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Available for Hire</span>
          </div>
          <span className="font-bold text-[#0a0a0a] tracking-tight text-sm sm:text-base">
            Christian Dator
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative px-4 py-2 rounded-full text-sm font-medium"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#0a0a0a] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${isActive ? 'text-white' : 'text-[#525252] hover:text-[#0a0a0a]'
                    }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-[#0a0a0a] text-white hover:bg-[#262626] transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#0a0a0a] hover:bg-[#e5e5e0] transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer — animated mount/unmount instead of instant show/hide */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#f5f5f0] border-b border-[#e0e0d8] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#0a0a0a] mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Hire — Quezon City</span>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#0a0a0a] hover:bg-[#e5e5e0] transition-all text-left"
                  >
                    <Icon className="w-4 h-4 text-[#525252]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#0a0a0a] text-white mt-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
