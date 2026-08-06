import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'experience', 'projects', 'contact'];
    const els = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    let ticking = false;

    const updateActiveSection = () => {
      const scrollPos = window.scrollY + 200;
      for (const el of els) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(el.id);
          break;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#0a0a0a] font-sans selection:bg-black selection:text-white">

      <div className="print:hidden">
        <Navbar
          onOpenResume={() => setIsResumeModalOpen(true)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <Hero
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        <ExperienceTimeline />

        <ProjectsShowcase />

        <ContactSection />
      </div>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

    </div>
  );
}

