import React, { useState, useEffect } from 'react';
import { personalInfo, workExperience } from '../data/resumeData';
import {
  X,
  Printer,
  Copy,
  Check,
  FileText,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const websiteUrl = "https://matteoo10.github.io/My-Portfolio-Website/";

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const generateTextResume = () => {
    return `
CHRISTIAN MATTHEW P. DATOR
${personalInfo.title}
${personalInfo.phone} | ${personalInfo.email} | ${personalInfo.location}
${websiteUrl}

PROFESSIONAL SUMMARY
${personalInfo.summary}

WORK EXPERIENCE

Five Star Bus Company | July 2025 - Present
Junior I.T Analyst
${workExperience[0].description.map(d => `- ${d}`).join('\n')}

National Children's Hospital | February 2025 - May 2025
IT Internship
- Assisted in basic networking tasks including cable management and device setup.
- Supported IT staff with hardware troubleshooting and daily technical tasks.

EDUCATION
Universidad de Manila | 2021 - 2025
Bachelor of Science in Information Technology
Relevant Subjects: Web Development, Computer Networks, Database Management
Capstone / Project: School Cafeteria Website using PHP and MongoDB

TECHNICAL SKILLS
- Networking: TCP/IP, DNS, DHCP, LAN, VLANs, firewall rules, router and switch configuration
- Tools: Microsoft Office, GitHub, VirtualBox, AnyDesk, Remote Desktop, Visual Studio Code, XAMPP, Command Prompt, PowerShell
- Support: Hardware and software troubleshooting, account setup, printer troubleshooting, remote support, ticket documentation, incident escalation, and preventive maintenance
- Programming Language: C++, Laravel Blade, PHP
- Database: MySQL, MongoDB

PROJECTS
IT Support Ticketing System | Five Star Bus Company
- Developing a system for logging, categorizing, prioritizing, tracking, and documenting IT support requests and resolutions
- Ticket creation with auto-classification based on severity (P1 Critical to P4 Low)
- Resolution timer & SLA tracking dashboard for IT support analysts
- Equipment asset tagging & history log linked to each support ticket

ID Management System | Five Star Bus Company
- A web-based ID issuance and tracking platform that allows users to submit ID requests, monitor real-time processing status
- Self-service ID request portal with form validation and photo upload
- Real-time status tracking dashboard (Submitted -> Reviewing -> Printing -> Ready -> Released)

School Cafeteria Web Portal | Capstone
- Academic Capstone Project built for Universidad de Manila to streamline food ordering, inventory monitoring, and cafeteria operations
- Dynamic menu item catalog with stock availability indicators
- Admin portal for cafeteria staff to update daily menu items and view revenue reports
    `.trim();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textResume = generateTextResume();
    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = () => {
    const textResume = generateTextResume();
    const blob = new Blob([textResume], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Christian_Matthew_Dator_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:static print:bg-white print:p-0 print:block print:overflow-visible"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative print:bg-white print:border-none print:shadow-none print:max-h-none print:static print:w-full print:p-0 print:overflow-visible"
          >

            <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between shrink-0 font-sans print:hidden">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="font-serif font-bold text-base text-zinc-100 hidden sm:block">
                  Resume Preview - Christian Matthew P. Dator
                </h3>
                <h3 className="font-serif font-bold text-sm text-zinc-100 sm:hidden">
                  Resume Preview
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyText}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium flex items-center space-x-1.5 border border-zinc-700 transition-colors"
                  title="Copy text version"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  <span className="hidden md:inline">{copied ? 'Copied' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={handleDownloadText}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium flex items-center space-x-1.5 border border-zinc-700 transition-colors"
                  title="Download text file"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden md:inline">Download .TXT</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center space-x-1.5 shadow transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="Close resume preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 bg-white font-sans text-xs sm:text-sm custom-scrollbar print-paper-content print:p-0 print:m-0 print:bg-white print:text-black print:overflow-visible print:max-h-none print:h-auto">

              <div className="space-y-4">
                <div className="text-center border-b-2 border-slate-800 pb-3 print:pb-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide uppercase">
                    CHRISTIAN MATTHEW P. DATOR
                  </h1>
                  <h2 className="text-sm sm:text-base font-bold text-slate-700 mt-0.5">
                    IT Support Specialist | Junior IT Analyst
                  </h2>
                  <div className="mt-1.5 flex flex-wrap justify-center items-center gap-3 text-xs text-slate-600">
                    <span>{personalInfo.phone}</span>
                    <span>|</span>
                    <span>{personalInfo.email}</span>
                    <span>|</span>
                    <span>Quezon City</span>
                  </div>
                  <div className="mt-0.5 text-xs text-slate-600">
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-800 font-medium">
                      {websiteUrl}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">
                    PROFESSIONAL SUMMARY
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-justify">
                    {personalInfo.summary}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                    WORK EXPERIENCE
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm">Five Star Bus Company</span>
                        <span className="text-xs text-slate-600">July 2025 - Present</span>
                      </div>
                      <div className="italic font-semibold text-slate-700 mb-1">Junior I.T Analyst</div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1">
                        {workExperience[0].description.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm">National Children's Hospital</span>
                        <span className="text-xs text-slate-600">February 2025 - May 2025</span>
                      </div>
                      <div className="italic font-semibold text-slate-700 mb-1">IT Internship</div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1">
                        <li>Assisted in basic networking tasks including cable management and device setup.</li>
                        <li>Supported IT staff with hardware troubleshooting and daily technical tasks.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">
                    EDUCATION
                  </h3>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-sm">Universidad de Manila</span>
                    <span className="text-xs text-slate-600" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>2021 - 2025</span>
                  </div>
                  <div className="font-semibold text-slate-800">Bachelor of Science in Information Technology</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    Relevant Subjects: Web Development, Computer Networks, Database Management
                  </div>
                  <div className="text-slate-700 text-xs font-medium mt-0.5">
                    Capstone / Project: School Cafeteria Website using PHP and MongoDB
                  </div>
                </div>
              </div>

              <div className="space-y-4 print-page-break-before pt-3 sm:pt-4 print:pt-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                    TECHNICAL SKILLS
                  </h3>
                  <ul className="space-y-1.5 text-slate-800 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 shrink-0">•</span>
                      <div>
                        <strong className="text-slate-900">Networking:</strong> TCP/IP, DNS, DHCP, LAN, VLANs, firewall rules, router and switch configuration
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 shrink-0">•</span>
                      <div>
                        <strong className="text-slate-900">Tools:</strong> Microsoft Office, GitHub, VirtualBox, AnyDesk, Remote Desktop, Visual Studio Code, XAMPP, Command Prompt, PowerShell
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 shrink-0">•</span>
                      <div>
                        <strong className="text-slate-900">Support:</strong> Hardware and software troubleshooting, account setup, printer troubleshooting, remote support, ticket documentation, incident escalation, and preventive maintenance
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 shrink-0">•</span>
                      <div>
                        <strong className="text-slate-900">Programming Language:</strong> C++, Laravel Blade, PHP
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 shrink-0">•</span>
                      <div>
                        <strong className="text-slate-900">Database:</strong> MySQL, MongoDB
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                    PROJECTS
                  </h3>
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm">IT Support Ticketing System</span>
                        <span className="text-xs text-slate-600 font-semibold">Five Star Bus Company</span>
                      </div>
                      <p className="text-slate-700 text-xs mt-0.5 italic">
                        Developing a system for logging, categorizing, prioritizing, tracking, and documenting IT support requests and resolutions across organizations.
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-xs pl-1 mt-1">
                        <li>Ticket creation with auto-classification based on severity (P1 Critical to P4 Low)</li>
                        <li>Resolution timer & SLA tracking dashboard for IT support analysts</li>
                        <li>Equipment asset tagging & history log linked to each support ticket</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm">ID Management System</span>
                        <span className="text-xs text-slate-600 font-semibold">Five Star Bus Company</span>
                      </div>
                      <p className="text-slate-700 text-xs mt-0.5 italic">
                        A web-based ID issuance and tracking platform that allows users to submit ID requests and monitor real-time processing status.
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-xs pl-1 mt-1">
                        <li>Self-service ID request portal with form validation and photo upload</li>
                        <li>Real-time status tracking dashboard (Submitted → Reviewing → Printing → Ready → Released)</li>
                        <li>Audit trail and transparency log — time-stamped action attribution</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm">School Cafeteria Web Portal</span>
                        <span className="text-xs text-slate-600 font-semibold">Academic Capstone</span>
                      </div>
                      <p className="text-slate-700 text-xs mt-0.5 italic">
                        Academic Capstone Project built for Universidad de Manila to streamline food ordering, inventory monitoring, and cafeteria operations.
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-xs pl-1 mt-1">
                        <li>Dynamic menu item catalog with stock availability indicators</li>
                        <li>Online order queuing system reducing physical counter wait times</li>
                        <li>Admin portal for cafeteria staff to update daily menu items and view daily revenue reports</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};