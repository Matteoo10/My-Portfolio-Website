import React, { useState } from 'react';
import { personalInfo } from '../data/resumeData';
import { Github, Linkedin, Mail, ArrowUpRight, MapPin } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import { useMagneticHover } from '../hooks/useMagneticHover';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [userPhoto] = useState<string>(personalInfo.profileImage);

  // Parallax: display name drifts slowest (background layer)
  const { style: bgNameStyle } = useParallax(0.4);
  // Parallax: portrait drifts slightly faster than name but slower than text
  const { style: portraitStyle } = useParallax(0.18);

  // Magnetic for primary CTA button
  const { ref: ctaRef, style: ctaStyle } = useMagneticHover(0.3);
  // Magnetic for each social link
  const { ref: ghRef, style: ghStyle } = useMagneticHover(0.25);
  const { ref: liRef, style: liStyle } = useMagneticHover(0.25);
  const { ref: mailRef, style: mailStyle } = useMagneticHover(0.25);

  const socialLinks = [
    { label: 'GitHub', href: personalInfo.github, Icon: Github, ref: ghRef, style: ghStyle },
    { label: 'LinkedIn', href: personalInfo.linkedin, Icon: Linkedin, ref: liRef, style: liStyle },
    { label: 'Email', href: `mailto:${personalInfo.email}`, Icon: Mail, ref: mailRef, style: mailStyle },
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-[#f5f5f0] overflow-hidden" style={{ minHeight: 'calc(100vh - 64px)' }}>

      {/* ── Large Display Name Behind Everything (parallax background layer) ── */}
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-center pointer-events-none select-none overflow-hidden parallax-bg"
        aria-hidden="true"
        style={bgNameStyle}
      >
        <span
          className="font-display leading-none tracking-tight whitespace-nowrap"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', lineHeight: 0.88 }}
        >
          <span className="text-outline">CHRISTIAN </span>
          <span className="text-[#0a0a0a]">DATOR</span>
        </span>
      </div>

      {/* ── Content Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="grid grid-cols-12 gap-4 h-full items-end pb-12 pt-8">

          {/* Left: Title & Bio (3 cols) */}
          <div className="col-span-12 lg:col-span-3 space-y-6 lg:self-center">
            <div>
              <p className="text-sm font-semibold text-[#0a0a0a] uppercase tracking-widest mb-1">
                IT Support Specialist
              </p>
              <p className="text-sm text-[#525252] leading-relaxed max-w-xs">
                Designing stable, secure IT environments — from network configuration to user support and web development.
              </p>
            </div>

            <div className="space-y-3">
              <button
                ref={ctaRef as React.RefObject<HTMLButtonElement>}
                onClick={scrollToContact}
                style={ctaStyle}
                className="magnetic-btn glow-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#0a0a0a] text-white hover:bg-[#262626] transition-colors group border border-transparent"
              >
                <span>Let's collaborate</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center: Portrait (6 cols) — parallax at intermediate speed */}
          <div className="col-span-12 lg:col-span-6 relative" style={{ minHeight: 'calc(100vh - 64px)' }}>
            <div
              className="absolute inset-x-0 bottom-0 flex justify-center items-end parallax-bg"
              style={{
                ...portraitStyle,
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            >
              <img
                src={userPhoto}
                alt="Christian Matthew P. Dator"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-top filter grayscale contrast-105 brightness-105 transition-all duration-700 hover:grayscale-0"
                style={{ maxHeight: '92vh', maxWidth: '520px' }}
              />
            </div>
          </div>

          {/* Right: Social Links (3 cols) — each is magnetic */}
          <div className="col-span-12 lg:col-span-3 flex flex-row lg:flex-col justify-center lg:justify-start gap-3 lg:self-center">
            {socialLinks.map(({ label, href, Icon, ref: sRef, style: sStyle }) => (
              <a
                key={label}
                href={href}
                ref={sRef as React.RefObject<HTMLAnchorElement>}
                style={sStyle}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="magnetic-card glow-hover flex items-center gap-2 px-3 py-2 rounded-full border border-[#d0d0c8] bg-white/60 text-sm font-medium text-[#0a0a0a] hover:bg-white transition-colors group"
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
