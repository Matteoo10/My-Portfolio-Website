import React, { useState, useRef } from 'react';
import { personalInfo } from '../data/resumeData';
import { 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  ArrowRight,
  Camera,
  Upload,
  UserCheck
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume
}) => {
  const [userPhoto, setUserPhoto] = useState<string>(() => {
    return localStorage.getItem('christian_dator_photo') || personalInfo.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUserPhoto(result);
        localStorage.setItem('christian_dator_photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-zinc-950 text-zinc-100 overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20">
      {/* Subtle Ambient Glow Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative Fine Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text Content & Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Status Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800/90 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Junior IT Analyst @ Five Star Bus Co.
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-300 font-medium">Quezon City, PH</span>
            </div>

            {/* Name & Title with Serif Display */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-zinc-100 leading-[1.1]">
                Christian Matthew <br className="hidden sm:inline" />
                <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-cyan-300">
                  P. Dator
                </span>
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-cyan-300 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>IT Support Specialist | Junior IT Analyst</span>
              </p>
            </div>

            {/* Concise Summary */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-sans">
              Information Technology graduate with hands-on experience in technical support, network configuration (
              <strong className="text-zinc-100 font-medium">Ubiquiti UniFi, VLANs, Firewalls</strong>), incident management, hardware/software repair, and web development (<strong className="text-zinc-100 font-medium">PHP & MongoDB</strong>). Reliable, detail-oriented, and structured for 24/7 IT operations.
            </p>

            {/* Key Skill Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Ubiquiti UniFi Networks",
                "VLANs & Firewalls",
                "Incident Escalation",
                "Thermal Printers & Desktop PC",
                "PowerShell & CLI",
                "PHP & MongoDB Capstone"
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Contact Quick Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300 border-t border-zinc-800/80">
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="flex items-center space-x-1.5 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{personalInfo.email}</span>
              </a>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <a 
                href={`tel:${personalInfo.phone}`} 
                className="flex items-center space-x-1.5 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </a>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenResume}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-zinc-100 text-zinc-950 shadow-lg hover:bg-white transition-all flex items-center space-x-2 border border-zinc-200"
              >
                <Download className="w-4 h-4" />
                <span>View / Download Resume</span>
              </button>

              <button
                onClick={scrollToContact}
                className="px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 text-cyan-300 border border-zinc-800 hover:bg-zinc-800 transition-all flex items-center space-x-2"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Seamless Blended Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-end h-full mt-6 lg:mt-0">
            {/* Radial Backlight behind portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Seamless Portrait Container */}
            <div className="relative w-full max-w-sm sm:max-w-md group">
              
              {/* Masked Image with Smooth Edge & Bottom Fade */}
              <div className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]">
                <img
                  src={userPhoto}
                  alt="Christian Matthew P. Dator"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[500px] object-cover object-top filter grayscale contrast-110 brightness-105 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
                />

                {/* Gradient Blend Layers into zinc-950 canvas */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/40 via-transparent to-zinc-950/40 pointer-events-none" />
              </div>

              {/* Upload Floating Button */}
              <div className="absolute bottom-4 right-2 z-20">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-300 border border-zinc-700/80 shadow-xl text-xs font-mono flex items-center space-x-1.5 transition-all opacity-80 group-hover:opacity-100 backdrop-blur-md cursor-pointer"
                  title="Upload or change photo"
                >
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload / Change Photo</span>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Status Indicator Tag floating seamlessly */}
              <div className="absolute top-2 right-2 z-20 px-2.5 py-1 rounded-full bg-zinc-950/80 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 flex items-center space-x-1.5 shadow-md backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

