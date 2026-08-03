import React, { useState } from 'react';
import { personalInfo } from '../data/resumeData';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import { useCinematicSection, useCinematicParallax, useCinematicPortraitReveal } from '../hooks/useCinematicScroll';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [userPhoto] = useState<string>(personalInfo.profileImage);

  // Section GSAP timeline hook
  const heroContainerRef = useCinematicSection<HTMLDivElement>({ triggerStart: 'top 95%' });
  const portraitContainerRef = useCinematicPortraitReveal<HTMLDivElement>();

  // Parallax: display name drifts slowest (background layer)
  const { style: bgNameStyle } = useParallax(0.4);
  // Parallax: GSAP scrubbed portrait drift
  const portraitRef = useCinematicParallax<HTMLImageElement>(-12);

  const socialLinks = [
    { label: 'GitHub', href: personalInfo.github, Icon: Github },
    { label: 'LinkedIn', href: personalInfo.linkedin, Icon: Linkedin },
    { label: 'Email', href: `mailto:${personalInfo.email}`, Icon: Mail },
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroContainerRef} className="relative bg-[#f5f5f0] overflow-hidden" style={{ isolation: 'isolate', minHeight: 'calc(100vh - 64px)' }}>

      {/* ── Large Display Name Behind Everything (parallax background layer) ── */}
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-center pointer-events-none select-none overflow-hidden parallax-bg"
        aria-hidden="true"
        style={bgNameStyle}
      >
        <span
          className="font-display leading-none tracking-tight whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 11.5vw, 11.5rem)', lineHeight: 0.88 }}
        >
          <span className="text-outline">CHRISTIAN </span>
          <span className="text-[#0a0a0a]">DATOR</span>
        </span>
      </div>

      {/* ── Content Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="grid grid-cols-12 gap-4 h-full items-end pt-8">

          {/* Left: Title & Bio (3 cols) */}
          <div className="col-span-12 lg:col-span-3 space-y-6 lg:self-center pb-8 lg:pb-12">
            <div data-gsap="heading">
              <p className="text-sm font-semibold text-[#0a0a0a] uppercase tracking-widest mb-1">
                IT Support Specialist
              </p>
              <p data-gsap="description" className="text-sm text-[#525252] leading-relaxed max-w-xs">
                Designing stable, secure IT environments — from network configuration to user support and web development.
              </p>
            </div>

            <div data-gsap="card" className="space-y-3">
              <button
                onClick={scrollToContact}
                className="glow-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#0a0a0a] text-white hover:bg-[#262626] transition-all hover:scale-105 active:scale-95 group border border-transparent shadow-md"
              >
                <span>Let's collaborate</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center: Portrait (6 cols) — GSAP scrubbed parallax & reveal */}
          <div ref={portraitContainerRef} className="col-span-12 lg:col-span-6 relative flex justify-center items-end" style={{ minHeight: 'calc(100vh - 64px)' }}>

            <div
              ref={portraitRef}
              className="absolute inset-x-0 bottom-0 flex justify-center items-end group cursor-pointer"
              style={{
                maskImage: 'linear-gradient(to bottom, black 75%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 98%)',
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
              }}
            >
              <img
                src={userPhoto}
                alt="Christian Matthew P. Dator"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-top mix-blend-multiply filter grayscale contrast-105 brightness-105 origin-[50%_25%] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.12] group-hover:contrast-110"
                style={{ maxHeight: '94vh', maxWidth: '640px' }}
              />
            </div>
          </div>

          {/* Right: Social Links (3 cols) */}
          <div className="col-span-12 lg:col-span-3 flex flex-row lg:flex-col justify-center lg:justify-start gap-3 lg:self-center pb-8 lg:pb-12">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                data-gsap="card"
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glow-hover flex items-center gap-2 px-3 py-2 rounded-full border border-[#d0d0c8] bg-white/60 text-sm font-medium text-[#0a0a0a] hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-md group"
              >
                <Icon className="w-4 h-4 text-[#525252] group-hover:text-[#0a0a0a] transition-colors shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Subtle bottom divider line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-[#e0e0d8]" />
    </section>
  );
};
