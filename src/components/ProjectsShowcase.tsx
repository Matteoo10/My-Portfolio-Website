import React from 'react';
import { projects } from '../data/resumeData';
import { Code2, CheckCircle2 } from 'lucide-react';
import { useCinematicSection } from '../hooks/useCinematicScroll';

// ── Individual project card ──────────────────────────────────────────────────

interface ProjectCardProps {
  project: typeof projects[number];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      data-gsap="card"
      className="glow-hover bg-[#f5f5f0] border border-[#d0d0c8] rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:border-[#0a0a0a] transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#e0e0d8] mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#0a0a0a] text-white">
              {project.category}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
              project.status === 'In Progress'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">{project.title}</h3>

        <p className="text-sm text-[#525252] mb-4 leading-relaxed">{project.description}</p>

        <div className="space-y-1.5 mb-5">
          <h5 className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-2">
            Key Capabilities
          </h5>
          {project.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-[#373737]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#e0e0d8]">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white text-[#373737] border border-[#d0d0c8]"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.architecture && (
          <p className="text-[11px] text-[#737373] font-mono italic mt-1">
            Arch: {project.architecture}
          </p>
        )}
      </div>
    </div>
  );
};

// ── Main Section ─────────────────────────────────────────────────────────────

export const ProjectsShowcase: React.FC = () => {
  const sectionRef = useCinematicSection<HTMLElement>({ triggerStart: 'top 80%', staggerStep: 0.15 });

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-white border-t border-[#e0e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div data-gsap="heading" className="inline-flex items-center gap-2 text-xs font-medium text-[#525252] uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-[#d0d0c8] bg-[#f5f5f0]">
            <Code2 className="w-3.5 h-3.5" />
            <span>Software Portfolio</span>
          </div>
          <h2 data-gsap="heading" className="text-3xl sm:text-5xl font-display text-[#0a0a0a] tracking-tight">
            Featured <span className="text-outline-thin">Projects</span>
          </h2>
          <p data-gsap="description" className="mt-4 text-sm sm:text-base text-[#525252] max-w-xl">
            Full-stack web applications bridging IT support operations with custom software development using PHP, Laravel Blade, MySQL, and MongoDB.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
};
