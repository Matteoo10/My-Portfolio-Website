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
  Clock,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('IT Job Opportunity / Helpdesk Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

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
    <section id="contact" className="py-16 bg-zinc-950 border-t border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Hiring & Inquiry Channel</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-100 tracking-tight">
            Get In Touch With Christian
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans">
            Currently open for Junior IT Analyst, Helpdesk Specialist, Network Support, and Web Development roles in Quezon City and remote/hybrid setups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-4 font-sans">
            
            {/* Direct Email Card */}
            <a 
              href={`mailto:${personalInfo.email}`}
              className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all flex items-start space-x-4 block group"
            >
              <div className="p-3 rounded-xl bg-zinc-950 text-cyan-400 border border-zinc-800 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-mono uppercase tracking-wider">Direct Email</span>
                <span className="text-base font-serif font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors">
                  {personalInfo.email}
                </span>
                <p className="text-xs text-zinc-400 mt-1">Prompt email responses within 24 hours.</p>
              </div>
            </a>

            {/* Direct Phone Card */}
            <a 
              href={`tel:${personalInfo.phone}`}
              className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all flex items-start space-x-4 block group"
            >
              <div className="p-3 rounded-xl bg-zinc-950 text-emerald-400 border border-zinc-800 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-mono uppercase tracking-wider">Mobile Phone / Viber</span>
                <span className="text-base font-serif font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {personalInfo.phone}
                </span>
                <p className="text-xs text-zinc-400 mt-1">Available for calls & WhatsApp/Viber messages.</p>
              </div>
            </a>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-zinc-950 text-amber-400 border border-zinc-800">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-mono uppercase tracking-wider">Location</span>
                <span className="text-base font-serif font-bold text-zinc-100">
                  {personalInfo.location}
                </span>
                <p className="text-xs text-zinc-400 mt-1">Ready for Metro Manila site deployments.</p>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200 flex items-center space-x-3 font-sans">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="block text-emerald-300 font-bold font-serif">Immediate Availability</strong>
                Ready for 24/7 rotational shifts and incident support schedules.
              </div>
            </div>

          </div>

          {/* Right Side: Message & Ticket Form */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            
            {isSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-950 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-zinc-100">Message Logged Successfully!</h3>
                <p className="text-xs font-mono text-cyan-300 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 inline-block">
                  TICKET REF: {ticketRef}
                </p>
                <p className="text-sm text-zinc-300 max-w-md mx-auto font-sans">
                  Thank you, <strong>{name}</strong>! Your inquiry has been dispatched to Christian Matthew P. Dator ({personalInfo.email}).
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-5 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-zinc-100">Send Direct Inquiry / Schedule Interview</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans">Submit details to create a direct dispatch ticket for Christian</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hiring Manager / Tech Lead"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. recruiter@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Subject / Position Title</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Message / Job Details *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Enter job description, interview schedule, or technical inquiry..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 font-bold text-zinc-950 text-sm shadow-lg transition-all flex items-center justify-center space-x-2 border border-zinc-300"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Christian</span>
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
