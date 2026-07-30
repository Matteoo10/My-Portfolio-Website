import React, { useState } from 'react';
import { personalInfo } from '../data/resumeData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagneticHover } from '../hooks/useMagneticHover';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('IT Job Opportunity / Helpdesk Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  // Scroll reveal
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.1 });

  // Magnetic hover on contact info cards
  const { ref: emailCardRef, style: emailCardStyle } = useMagneticHover(0.22);
  const { ref: phoneCardRef, style: phoneCardStyle } = useMagneticHover(0.22);
  const { ref: ghBtnRef, style: ghBtnStyle } = useMagneticHover(0.25);
  const { ref: liBtnRef, style: liBtnStyle } = useMagneticHover(0.25);

  // Magnetic on submit button
  const { ref: submitRef, style: submitStyle } = useMagneticHover(0.28);

  // Scroll reveal for form panel
  const { ref: formRevealRef, isVisible: formVisible } = useScrollReveal({ delay: 120 });
  // Scroll reveal for left col
  const { ref: leftRevealRef, isVisible: leftVisible } = useScrollReveal({ delay: 40 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const generatedRef = `CONTACT-INC-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketRef(generatedRef);
    setIsSent(true);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="contact" className="py-20 bg-[#f5f5f0] border-t border-[#e0e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`mb-14 reveal-block ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#525252] uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-[#d0d0c8] bg-white/60">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hiring &amp; Inquiry Channel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display text-[#0a0a0a] tracking-tight">
            Get In <span className="text-outline-thin">Touch</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#525252] max-w-xl">
            Currently open for Junior IT Analyst, Helpdesk Specialist, Network Support, and Web Development roles in Quezon City and remote/hybrid setups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Info */}
          <div
            ref={leftRevealRef as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-5 space-y-4 reveal-block ${leftVisible ? 'is-visible' : ''}`}
          >
            
            {/* Direct Email */}
            <a 
              href={`mailto:${personalInfo.email}`}
              ref={emailCardRef as React.RefObject<HTMLAnchorElement>}
              style={emailCardStyle}
              className="magnetic-card glow-hover p-5 rounded-2xl bg-white border border-[#d0d0c8] flex items-start gap-4 group block"
            >
              <div className="p-3 rounded-xl bg-[#f5f5f0] border border-[#e0e0d8] group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] transition-all">
                <Mail className="w-5 h-5 text-[#525252] group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="text-xs text-[#737373] block font-mono uppercase tracking-widest">Direct Email</span>
                <span className="text-base font-bold text-[#0a0a0a] group-hover:underline transition-all">
                  {personalInfo.email}
                </span>
                <p className="text-xs text-[#737373] mt-1">Prompt responses within 24 hours.</p>
              </div>
            </a>

            {/* Phone */}
            <a 
              href={`tel:${personalInfo.phone}`}
              ref={phoneCardRef as React.RefObject<HTMLAnchorElement>}
              style={phoneCardStyle}
              className="magnetic-card glow-hover p-5 rounded-2xl bg-white border border-[#d0d0c8] flex items-start gap-4 group block"
            >
              <div className="p-3 rounded-xl bg-[#f5f5f0] border border-[#e0e0d8] group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] transition-all">
                <Phone className="w-5 h-5 text-[#525252] group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="text-xs text-[#737373] block font-mono uppercase tracking-widest">Mobile / Viber</span>
                <span className="text-base font-bold text-[#0a0a0a] group-hover:underline transition-all">
                  {personalInfo.phone}
                </span>
                <p className="text-xs text-[#737373] mt-1">Available for calls &amp; WhatsApp/Viber.</p>
              </div>
            </a>

            {/* Location */}
            <div className="p-5 rounded-2xl bg-white border border-[#e0e0d8] flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#f5f5f0] border border-[#e0e0d8]">
                <MapPin className="w-5 h-5 text-[#525252]" />
              </div>
              <div>
                <span className="text-xs text-[#737373] block font-mono uppercase tracking-widest">Location</span>
                <span className="text-base font-bold text-[#0a0a0a]">{personalInfo.location}</span>
                <p className="text-xs text-[#737373] mt-1">Ready for Metro Manila site deployments.</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                ref={ghBtnRef as React.RefObject<HTMLAnchorElement>}
                style={ghBtnStyle}
                className="magnetic-btn glow-hover flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-[#d0d0c8] text-sm font-medium text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                ref={liBtnRef as React.RefObject<HTMLAnchorElement>}
                style={liBtnStyle}
                className="magnetic-btn glow-hover flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-[#d0d0c8] text-sm font-medium text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            {/* Availability badge */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              <div>
                <strong className="block font-bold">Immediately Available</strong>
                Ready for 24/7 rotational shifts and incident support schedules.
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div
            ref={formRevealRef as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-7 bg-white border border-[#d0d0c8] rounded-2xl p-6 sm:p-8 shadow-sm reveal-block ${formVisible ? 'is-visible' : ''}`}
          >
            
            {isSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0a0a0a]">Message Sent!</h3>
                <p className="text-xs font-mono text-[#737373] bg-[#f5f5f0] p-2.5 rounded-xl border border-[#e0e0d8] inline-block">
                  REF: {ticketRef}
                </p>
                <p className="text-sm text-[#525252] max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>! Your inquiry has been dispatched to Christian Matthew P. Dator.
                </p>
                <button
                  onClick={() => { setIsSent(false); setName(''); setEmail(''); setMessage(''); }}
                  className="px-5 py-2 rounded-full bg-[#0a0a0a] text-sm font-semibold text-white hover:bg-[#262626] transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#e0e0d8] mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0a0a0a]">Send Direct Inquiry</h3>
                    <p className="text-xs text-[#737373] mt-0.5">Schedule an interview or reach out directly</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#737373] shrink-0" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-[#0a0a0a] mb-1 text-xs uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hiring Manager"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f0] border border-[#d0d0c8] text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#a0a098]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#0a0a0a] mb-1 text-xs uppercase tracking-wide">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="recruiter@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f0] border border-[#d0d0c8] text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#a0a098]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-[#0a0a0a] mb-1 text-xs uppercase tracking-wide">Subject / Position</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f0] border border-[#d0d0c8] text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#0a0a0a] mb-1 text-xs uppercase tracking-wide">Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Enter job description, interview schedule, or technical inquiry..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f0] border border-[#d0d0c8] text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors resize-none placeholder:text-[#a0a098]"
                    />
                  </div>

                  <button
                    ref={submitRef as React.RefObject<HTMLButtonElement>}
                    type="submit"
                    style={submitStyle}
                    className="magnetic-btn glow-hover w-full py-3 rounded-xl bg-[#0a0a0a] hover:bg-[#262626] font-bold text-white text-sm transition-colors flex items-center justify-center gap-2 border border-transparent"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-[#e0e0d8] pt-8 text-center">
        <p className="text-xs text-[#a0a098] font-mono">
          © {new Date().getFullYear()} Christian Matthew P. Dator — IT Support Specialist &amp; Junior IT Analyst
        </p>
      </div>
    </section>
  );
};
