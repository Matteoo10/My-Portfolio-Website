import React, { useState } from 'react';
import { projects } from '../data/resumeData';
import { Code2, CheckCircle2, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useCinematicSection } from '../hooks/useCinematicScroll';

// ── Individual project card with Image Preview Gallery ───────────────────────

interface ProjectCardProps {
  project: typeof projects[number];
  onOpenLightbox: (images: string[], initialIndex: number, title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenLightbox }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = project.images || [];

  return (
    <div
      data-gsap="card"
      className="glow-hover bg-[#f5f5f0] border border-[#d0d0c8] rounded-2xl flex flex-col justify-start hover:-translate-y-1 hover:shadow-xl hover:border-[#0a0a0a] transition-all duration-300 overflow-hidden"
    >
      <div>
        {/* Project Screenshot Gallery Showcase */}
        {images.length > 0 ? (
          <div className="relative group bg-[#0a0a0a] border-b border-[#d0d0c8] overflow-hidden">
            {/* Screenshot Display */}
            <div
              className="relative aspect-video cursor-pointer overflow-hidden"
              onClick={() => onOpenLightbox(images, activeImageIndex, project.title)}
            >
              <img
                src={images[activeImageIndex]}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-[#0a0a0a] text-xs font-semibold shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand view</span>
                </span>
              </div>

              {/* Image Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
                <ImageIcon className="w-3 h-3 text-cyan-400" />
                <span>Screenshot {activeImageIndex + 1}/{images.length}</span>
              </div>
            </div>

            {/* Thumbnail Switcher Bar (if multiple screenshots exist) */}
            {images.length > 1 && (
              <div className="p-2 bg-[#121212] border-t border-white/10 flex items-center gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-md overflow-hidden border-2 transition-all h-10 w-16 shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-cyan-400 scale-105 shadow-md'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : null}

        <div className="p-5 sm:p-6">
          {/* Header Badges */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e0e0d8] mb-3">
            <div className="flex items-center gap-2 flex-wrap">
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

          <p className="text-sm text-[#525252] mb-3.5 leading-relaxed">{project.description}</p>

          <div className="space-y-1.5">
            <h5 className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-1.5">
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
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 mt-auto">
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
    </div>
  );
};

// ── Main Section & Lightbox Modal ────────────────────────────────────────────

export const ProjectsShowcase: React.FC = () => {
  const sectionRef = useCinematicSection<HTMLElement>({ triggerStart: 'top 80%', staggerStep: 0.15 });

  // Lightbox Modal state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });

  const handleOpenLightbox = (images: string[], initialIndex: number, title: string) => {
    setLightboxState({
      isOpen: true,
      images,
      currentIndex: initialIndex,
      title
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handlePrevImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  const handleNextImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Fullscreen Screenshot View */}
      {lightboxState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative max-w-6xl w-full flex flex-col items-center">
            
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-white mb-4 px-2">
              <h4 className="text-lg font-bold font-display">{lightboxState.title}</h4>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-neutral-400">
                  {lightboxState.currentIndex + 1} of {lightboxState.images.length}
                </span>
                <button
                  onClick={handleCloseLightbox}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Screenshot Image */}
            <div className="relative w-full max-h-[80vh] flex items-center justify-center rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <img
                src={lightboxState.images[lightboxState.currentIndex]}
                alt={`${lightboxState.title} screenshot ${lightboxState.currentIndex + 1}`}
                className="max-h-[80vh] w-auto object-contain"
              />

              {/* Prev / Next Controls (if multiple images) */}
              {lightboxState.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all shadow-xl"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all shadow-xl"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
