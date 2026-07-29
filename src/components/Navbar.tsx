import React, { useState } from 'react';
import { 
  FileText, 
  Terminal, 
  Send, 
  Briefcase, 
  Code2, 
  Menu, 
  X,
  ArrowUpRight
} from 'lucide-react';

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

  const navItems = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Terminal },
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

  return (
    <header className="sticky top-0 z-40 bg-[#f5f5f0]/90 backdrop-blur-md border-b border-[#e0e0d8]">
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#0a0a0a] text-white'
                    : 'text-[#525252] hover:text-[#0a0a0a] hover:bg-[#e5e5e0]'
                }`}
              >
                {item.label}
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

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f5f5f0] border-b border-[#e0e0d8] px-4 pt-2 pb-4 space-y-1">
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
      )}
    </header>
  );
};
