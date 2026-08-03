import React from 'react';
import { skillGroups } from '../data/resumeData';
import { 
  Terminal as TerminalIcon, 
  Network, 
  Wrench, 
  Code2,
  FileText
} from 'lucide-react';
import { useCinematicSection } from '../hooks/useCinematicScroll';

interface SkillsMatrixProps {
  onOpenResume?: () => void;
}

// ── Individual skill card ────────────────────────────────────────────────────

interface SkillCardProps {
  group: typeof skillGroups[number];
  getCategoryIcon: (cat: string) => React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ group, getCategoryIcon }) => {
  return (
    <div
      data-gsap="card"
      className="glow-hover bg-white border border-[#d0d0c8] rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      <div>
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#e0e0d8]">
          <div className="p-2.5 rounded-xl bg-[#f5f5f0] border border-[#e0e0d8]">
            {getCategoryIcon(group.category)}
          </div>
          <h3 className="font-bold text-sm text-[#0a0a0a] leading-tight">{group.category}</h3>
        </div>

        <p className="text-xs text-[#737373] mb-4 leading-relaxed">{group.description}</p>

        <div className="space-y-3">
          {group.skills.map((skill, i) => (
            <div key={i} className="text-xs">
              <div className="flex justify-between mb-1">
                <span className={`font-medium ${skill.highlight ? 'text-[#0a0a0a]' : 'text-[#373737]'}`}>
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono text-[#525252] font-bold">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-[#f0f0ea] rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    skill.highlight ? 'bg-[#0a0a0a]' : 'bg-[#a3a3a0]'
                  }`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Section ─────────────────────────────────────────────────────────────

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ onOpenResume }) => {
  const sectionRef = useCinematicSection<HTMLElement>({ triggerStart: 'top 80%', staggerStep: 0.1 });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Networking & Infrastructure': return <Network className="w-5 h-5 text-[#0a0a0a]" />;
      case 'IT Support & Administration': return <Wrench className="w-5 h-5 text-[#0a0a0a]" />;
      case 'Tools & Utilities': return <TerminalIcon className="w-5 h-5 text-[#0a0a0a]" />;
      default: return <Code2 className="w-5 h-5 text-[#0a0a0a]" />;
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-[#f5f5f0] border-t border-[#e0e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div data-gsap="heading" className="inline-flex items-center gap-2 text-xs font-medium text-[#525252] uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-[#d0d0c8] bg-white/60">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 data-gsap="heading" className="text-3xl sm:text-5xl font-display text-[#0a0a0a] tracking-tight">
            Skills <span className="text-outline-thin">Matrix</span>
          </h2>
          <p data-gsap="description" className="mt-4 text-sm sm:text-base text-[#525252] max-w-xl">
            Comprehensive skill matrix covering network configuration, hardware troubleshooting, support tools, and web development.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group, idx) => (
            <SkillCard
              key={idx}
              group={group}
              getCategoryIcon={getCategoryIcon}
            />
          ))}
        </div>

        {/* Resume CTA */}
        {onOpenResume && (
          <div data-gsap="item" className="mt-12 text-center">
            <button
              onClick={onOpenResume}
              className="glow-hover inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#0a0a0a] text-white hover:bg-[#262626] transition-all hover:scale-105 active:scale-95 border border-transparent shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Resume</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
