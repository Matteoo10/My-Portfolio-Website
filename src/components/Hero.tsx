import React, { useState } from 'react';
import { personalInfo } from '../data/resumeData';
import { Github, Linkedin, Mail, ArrowUpRight, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [userPhoto] = useState<string>(personalInfo.profileImage);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'GitHub', href: personalInfo.github, Icon: Github },
    { label: 'LinkedIn', href: personalInfo.linkedin, Icon: Linkedin },
    { label: 'Email', href: `mailto:${personalInfo.email}`, Icon: Mail },
  ];

  return (
    <section id="hero" className="relative bg-[#f5f5f0] overflow-hidden" style={{ minHeight: 'calc(100vh - 64px)' }}>

      {/* ── Large Display Name Behind Everything ── */}
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
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
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#0a0a0a] text-white hover:bg-[#262626] transition-all group"
              >
                <span>Let's collaborate</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <div>
                <button
                  onClick={onOpenResume}
                  className="text-sm font-medium text-[#525252] hover:text-[#0a0a0a] underline underline-offset-4 transition-colors"
                >
                  View Resume →
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#525252]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Center: Portrait (6 cols) — absolutely fills behind name */}
          <div className="col-span-12 lg:col-span-6 relative" style={{ minHeight: 'calc(100vh - 64px)' }}>
            <div
              className="absolute inset-x-0 bottom-0 flex justify-center items-end"
              style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
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

          {/* Right: Social Links (3 cols) */}
          <div className="col-span-12 lg:col-span-3 flex flex-row lg:flex-col justify-center lg:justify-start gap-3 lg:self-center">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#d0d0c8] bg-white/60 text-sm font-medium text-[#0a0a0a] hover:bg-white hover:border-[#a0a098] hover:shadow-sm transition-all group"
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
