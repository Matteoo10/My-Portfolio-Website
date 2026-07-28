import React from 'react';
import { workExperience, education } from '../data/resumeData';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Layers, 
  Sparkles 
} from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 bg-zinc-950 border-t border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Professional Career History</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-100 tracking-tight">
            Work Experience & Education
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans">
            Proven track record supporting high-availability IT environments, network equipment maintenance, and web application development.
          </p>
        </div>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Work History (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-serif font-bold text-zinc-100 flex items-center space-x-2 pb-2 border-b border-zinc-800">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Professional IT Work Experience</span>
            </h3>

            <div className="space-y-6">
              {workExperience.map((exp) => (
                <div 
                  key={exp.id}
                  className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl relative transition-all hover:border-zinc-700"
                >
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-serif font-bold text-zinc-100">{exp.role}</h4>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-cyan-300 border border-zinc-700">
                          {exp.type === 'fulltime' ? 'Current Role' : 'Internship'}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-cyan-300 mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    <div className="text-xs text-zinc-400 font-mono space-y-0.5">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="my-4 space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                    {exp.description.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skill Badges */}
                  <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-950 text-zinc-300 border border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Education & Academic Capstone (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-serif font-bold text-zinc-100 flex items-center space-x-2 pb-2 border-b border-zinc-800">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>Education & Qualifications</span>
            </h3>

            {/* University Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-zinc-100">
                    {education.degree}
                  </h4>
                  <p className="text-sm font-semibold text-indigo-300 mt-0.5">
                    {education.institution}
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                  {education.period}
                </span>
              </div>

              {/* Relevant Subjects */}
              <div className="my-4">
                <h5 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Relevant Academic Subjects</span>
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {education.relevantSubjects.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-950 border border-zinc-800 text-zinc-300"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capstone Showcase Box */}
              <div className="mt-5 p-4 rounded-xl bg-zinc-950 border border-zinc-800/90">
                <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>Academic Capstone Project</span>
                </div>
                <h5 className="text-sm font-bold text-zinc-100 font-serif">
                  {education.capstone.title}
                </h5>
                <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed font-sans">
                  {education.capstone.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {education.capstone.techStack.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Certifications / Professional Readiness Box */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xl">
              <h4 className="text-sm font-serif font-bold text-zinc-100 flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Operational Strengths & Value Add</span>
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Hands-on experience in 24/7 continuous operations support and emergency incident response.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Bridge between hardware IT infrastructure and web development software stacks (PHP/MySQL/MongoDB).</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
