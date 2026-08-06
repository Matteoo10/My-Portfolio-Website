import React, { useEffect, useRef } from 'react';
import { workExperience, education } from '../data/resumeData';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  Award,
  Sparkles
} from 'lucide-react';
import { useMagneticHover } from '../hooks/useMagneticHover';
import { useCinematicSection } from '../hooks/useCinematicScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceCardProps {
  exp: typeof workExperience[number];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp }) => {
  const { ref: magRef, style: magStyle } = useMagneticHover(0.22);

  return (
    <div
      ref={magRef as React.RefObject<HTMLDivElement>}
      style={magStyle}
      className="magnetic-card glow-hover bg-[#f5f5f0] border border-[#d0d0c8] rounded-2xl p-6 relative"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-[#e0e0d8] gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base font-bold text-[#0a0a0a]">{exp.role}</h4>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0a0a0a] text-white">
              {exp.type === 'fulltime' ? 'Current' : 'Internship'}
            </span>
          </div>
          <p className="text-sm font-semibold text-[#525252] mt-0.5">{exp.company}</p>
        </div>

        <div className="text-xs text-[#737373] font-mono space-y-0.5 shrink-0">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{exp.period}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{exp.location}</span>
          </div>
        </div>
      </div>

      <div className="my-4 space-y-2 text-sm text-[#373737]">
        {exp.description.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{bullet}</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#e0e0d8] flex flex-wrap gap-1.5">
        {exp.tags.map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-[#373737] border border-[#d0d0c8]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const EducationCard: React.FC = () => {
  const { ref: magRef, style: magStyle } = useMagneticHover(0.18);

  return (
    <div
      ref={magRef as React.RefObject<HTMLDivElement>}
      style={magStyle}
      className="magnetic-card glow-hover bg-[#f5f5f0] border border-[#d0d0c8] rounded-2xl p-6"
    >
      <div className="flex items-start justify-between pb-3 border-b border-[#e0e0d8] gap-3">
        <div>
          <h4 className="text-base font-bold text-[#0a0a0a]">{education.degree}</h4>
          <p className="text-sm font-semibold text-[#525252] mt-0.5">{education.institution}</p>
        </div>
        <span
          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white border border-[#d0d0c8] text-[#373737]"
          style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          {education.period}
        </span>
      </div>

      <div className="my-4">
        <h5 className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          Relevant Academic Subjects
        </h5>
        <div className="flex flex-wrap gap-1.5">
          {education.relevantSubjects.map((sub, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-[#d0d0c8] text-[#373737]"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-white border border-[#e0e0d8]">
        <div className="flex items-center gap-2 text-[#0a0a0a] font-bold text-xs uppercase tracking-wider mb-1">
          <Award className="w-4 h-4" />
          <span>Academic Capstone Project</span>
        </div>
        <h5 className="text-sm font-bold text-[#0a0a0a]">{education.capstone.title}</h5>
        <p className="text-xs text-[#525252] mt-1.5 leading-relaxed">{education.capstone.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {education.capstone.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#f5f5f0] text-[#0a0a0a] border border-[#d0d0c8]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const StrengthsCard: React.FC = () => {
  const { ref: magRef, style: magStyle } = useMagneticHover(0.18);

  return (
    <div
      ref={magRef as React.RefObject<HTMLDivElement>}
      style={magStyle}
      className="magnetic-card glow-hover bg-[#f5f5f0] border border-[#d0d0c8] rounded-2xl p-5"
    >
      <h4 className="text-sm font-bold text-[#0a0a0a] flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4" />
        Operational Strengths
      </h4>
      <ul className="space-y-2 text-sm text-[#373737]">
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] mt-2 shrink-0" />
          <span>Hands-on experience in 24/7 continuous operations support and emergency incident response.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] mt-2 shrink-0" />
          <span>Bridge between hardware IT infrastructure and web development software stacks (PHP/MySQL/MongoDB).</span>
        </li>
      </ul>
    </div>
  );
};

export const ExperienceTimeline: React.FC = () => {
  const sectionRef = useCinematicSection<HTMLElement>({ triggerStart: 'top 80%' });
  const railRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!railRef.current || !railFillRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        railFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.4,
          },
        }
      );

      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        gsap.to(dot, {
          backgroundColor: '#0a0a0a',
          borderColor: '#0a0a0a',
          scale: 1.15,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dot,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, railRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-white border-t border-[#e0e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-14">
          <div data-gsap="heading" className="inline-flex items-center gap-2 text-xs font-medium text-[#525252] uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-[#d0d0c8] bg-[#f5f5f0]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2 data-gsap="heading" className="text-3xl sm:text-5xl font-display text-[#0a0a0a] tracking-tight">
            Work Experience<br /><span className="text-outline-thin">&amp; Education</span>
          </h2>
          <p data-gsap="description" className="mt-4 text-sm sm:text-base text-[#525252] max-w-xl">
            Proven track record supporting high-availability IT environments, network equipment maintenance, and web application development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-7 space-y-5">
            <h3 data-gsap="heading" className="text-sm font-semibold text-[#0a0a0a] uppercase tracking-widest flex items-center gap-2 pb-3 border-b border-[#e0e0d8]">
              <Briefcase className="w-4 h-4" />
              Professional IT Work Experience
            </h3>

            <div ref={railRef} className="relative">
              <div className="absolute left-4 top-1 bottom-1 w-px bg-[#e0e0d8]" aria-hidden="true" />
              <div
                ref={railFillRef}
                className="absolute left-4 top-1 bottom-1 w-px bg-[#0a0a0a] origin-top"
                style={{ transform: 'scaleY(0)' }}
                aria-hidden="true"
              />

              <div className="space-y-5">
                {workExperience.map((exp, i) => (
                  <div key={exp.id} data-gsap="card" className="flex gap-4">
                    <div className="w-8 flex justify-center pt-6 shrink-0">
                      <span
                        ref={(el) => { dotRefs.current[i] = el; }}
                        className="w-3.5 h-3.5 rounded-full bg-[#f5f5f0] border-2 border-[#d0d0c8] relative z-10"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <ExperienceCard exp={exp} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <h3 data-gsap="heading" className="text-sm font-semibold text-[#0a0a0a] uppercase tracking-widest flex items-center gap-2 pb-3 border-b border-[#e0e0d8]">
              <GraduationCap className="w-4 h-4" />
              Education &amp; Qualifications
            </h3>

            <div data-gsap="card">
              <EducationCard />
            </div>
            <div data-gsap="card">
              <StrengthsCard />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

