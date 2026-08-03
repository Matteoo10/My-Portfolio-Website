import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  Briefcase, 
  Code2, 
  FileText, 
  Send, 
  MessageSquare
} from 'lucide-react';

interface FloatingActionBarProps {
  onOpenResume: () => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onOpenResume,
  activeSection,
  scrollToSection,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show action bar after scrolling past 180px
      if (window.scrollY > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'experience', label: 'Experience', shortLabel: 'Work', icon: Briefcase },
    { id: 'projects', label: 'Projects', shortLabel: 'Projects', icon: Code2 },
    { id: 'contact', label: 'Contact', shortLabel: 'Chat', icon: MessageSquare },
  ];

  return (
    <div
      aria-label="Floating Action Bar"
      className={`fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-50 print:hidden pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/15 text-white shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6),0_0_30px_rgba(255,255,255,0.1)] transition-shadow duration-300">
        
        {/* Back to Top button */}
        <button
          onClick={scrollToTop}
          title="Scroll to top"
          className="p-2 sm:p-2.5 rounded-full hover:bg-white/15 text-neutral-300 hover:text-white transition-colors duration-200 group relative flex items-center justify-center shrink-0"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
          <span className="sr-only">Back to top</span>
          
          {/* Tooltip on hover */}
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#0a0a0a] text-white text-[11px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white/10 shadow-lg">
            Back to Top
          </span>
        </button>

        <div className="w-px h-5 bg-white/15 shrink-0" />

        {/* Section Quick Navigation */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-inner font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
                <span className="hidden md:inline">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse md:hidden" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="w-px h-5 bg-white/15 shrink-0" />

        {/* Quick Resume Button */}
        <button
          onClick={onOpenResume}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full text-xs font-medium text-neutral-200 hover:text-white hover:bg-white/10 transition-colors duration-200"
          title="View & Download Resume"
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Resume</span>
        </button>

        {/* Primary CTA: Hire Me */}
        <button
          onClick={() => scrollToSection('contact')}
          className="group relative flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-[#0a0a0a] text-xs font-semibold hover:bg-emerald-400 hover:text-[#0a0a0a] transition-all duration-300 shadow-md hover:shadow-emerald-500/20 active:scale-95 shrink-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Hire Me</span>
          <Send className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>

      </div>
    </div>
  );
};
