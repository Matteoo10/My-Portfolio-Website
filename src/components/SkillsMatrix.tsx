import React from 'react';
import { skillGroups } from '../data/resumeData';
import { 
  Terminal as TerminalIcon, 
  Network, 
  Wrench, 
  Code2
} from 'lucide-react';

interface SkillsMatrixProps {
  onOpenResume?: () => void;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ onOpenResume }) => {
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Networking & Infrastructure': return <Network className="w-5 h-5 text-cyan-400" />;
      case 'IT Support & Administration': return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'Tools & Utilities': return <TerminalIcon className="w-5 h-5 text-indigo-400" />;
      default: return <Code2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-16 bg-zinc-950 border-t border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-100 tracking-tight">
            Technical Skills Matrix
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans">
            Comprehensive skill matrix covering network configuration, hardware troubleshooting, support tools, and web development.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, idx) => (
            <div 
              key={idx}
              className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xl relative flex flex-col justify-between hover:border-zinc-700 transition-all"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-zinc-800">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    {getCategoryIcon(group.category)}
                  </div>
                  <h3 className="font-serif font-bold text-sm text-zinc-100">{group.category}</h3>
                </div>

                <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-sans">
                  {group.description}
                </p>

                <div className="space-y-3 font-sans">
                  {group.skills.map((skill, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span className={`font-medium ${skill.highlight ? 'text-zinc-100' : 'text-zinc-300'}`}>
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                        <div 
                          className={`h-full rounded-full ${
                            skill.highlight 
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                              : 'bg-zinc-600'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Detailed Resume Action */}
        {onOpenResume && (
          <div className="mt-12 text-center">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-cyan-300 transition-all shadow-md cursor-pointer"
            >
              <span>View Full Printable Resume Spec</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
