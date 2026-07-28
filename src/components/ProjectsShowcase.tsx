import React from 'react';
import { projects } from '../data/resumeData';
import { 
  Code2, 
  CheckCircle2
} from 'lucide-react';

export const ProjectsShowcase: React.FC = () => {
  return (
    <section id="projects" className="py-16 bg-zinc-950 border-t border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Software Development & Systems Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-100 tracking-tight">
            Featured Web & Systems Projects
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans">
            Full-stack web applications bridging IT support operations with custom software development using PHP, Laravel Blade, MySQL, and MongoDB.
          </p>
        </div>

        {/* Projects Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 shadow-xl relative transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-zinc-950 text-cyan-300 border border-zinc-800">
                        {project.category}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        project.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-zinc-100 mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 mb-4 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  <div className="space-y-1.5 mb-5 font-sans">
                    <h5 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Key System Capabilities
                    </h5>
                    {project.features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-1.5 mb-3 font-mono">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-950 text-zinc-300 border border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.architecture && (
                    <p className="text-[11px] text-zinc-400 font-mono italic">
                      Arch: {project.architecture}
                    </p>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
