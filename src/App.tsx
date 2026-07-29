import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-cyan-500 selection:text-zinc-950">
      
      <div className="print:hidden">
        {/* Top Navbar */}
        <Navbar
          onOpenResume={() => setIsResumeModalOpen(true)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Hero Header */}
        <Hero
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* Work Experience & Education Timeline */}
        <ExperienceTimeline />

        {/* Technical Skills & Interactive CLI */}
        <SkillsMatrix
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* Projects Showcase & Wireframe Demos */}
        <ProjectsShowcase />

        {/* Contact & Direct Dispatch */}
        <ContactSection />
      </div>

      {/* Printable/Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

    </div>
  );
}
