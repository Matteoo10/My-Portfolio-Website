import React, { useState } from 'react';
import { personalInfo, workExperience } from '../data/resumeData';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const websiteUrl = "https://matteoo10.github.io/My-Portfolio-Website/";

  const handleCopyText = () => {
    const textResume = `
CHRISTIAN MATTHEW P. DATOR
${personalInfo.title}
${personalInfo.phone} | ${personalInfo.email} | ${personalInfo.location}
${websiteUrl}

PROFESSIONAL SUMMARY
${personalInfo.summary}

WORK EXPERIENCE

National Children's Hospital | February 2025 - May 2025
IT Internship
- Assisted in basic networking tasks including cable management and device setup.
- Supported IT staff with hardware troubleshooting and daily technical tasks.

Five Star Bus Company | July 2025 - Present
Junior I.T Analyst
${workExperience[0].description.map(d => `- ${d}`).join('\n')}

EDUCATION
Universidad de Manila | 2021 - 2025
Bachelor of Science in Information Technology
Relevant Subjects: Web Development, Computer Networks, Database Management
Capstone / Project: School Cafeteria Website using PHP and MongoDB

TECHNICAL SKILLS
- Networking: TCP/IP, DNS, DHCP, LAN, VLANs, firewall rules, router and switch configuration
- Tools: Microsoft Office, GitHub, VirtualBox, AnyDesk, Remote Desktop, Visual Studio Code, XAMPP, Command Prompt, PowerShell
- Support: Hardware and software troubleshooting, account setup, printer troubleshooting, remote support, ticket documentation, incident escalation, and preventive maintenance
- Progamming Language: C++, Laravel Blade, PHP
- Database: MySQL, MongoDB

PROJECTS
IT Ticketing System | Five Star Bus Company
• Developing a system for logging, categorizing, prioritizing, tracking, and documenting IT support requests and resolutions

ID Management System | Five Star Bus Company
• A web-based ID issuance and tracking platform that allows users to submit ID requests, monitor real-time processing status.

School Cafeteria Web Portal | Capstone
• Academic Capstone Project built for Universidad de Manila to streamline food ordering, inventory monitoring, and cafeteria operations.
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:static print:bg-white print:p-0 print:block">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative print:bg-white print:border-none print:shadow-none print:max-h-none print:static print:w-full print:p-0">
        
        {/* Top Controls Header */}
        <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between shrink-0 font-sans print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="font-serif font-bold text-base text-zinc-100">
              Resume Preview - Christian Matthew P. Dator
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium flex items-center space-x-1.5 border border-zinc-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copied ? 'Copied Text' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center space-x-1.5 shadow transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Paper View */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 bg-white font-sans text-xs sm:text-sm custom-scrollbar print:p-0 print:m-0 print:bg-white print:text-black">
          
          {/* Header */}
          <div className="text-center border-b-2 border-slate-800 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide uppercase">
              CHRISTIAN MATTHEW P. DATOR
            </h1>
            <h2 className="text-sm sm:text-base font-bold text-slate-700 mt-1">
              IT Support Specialist | Junior IT Analyst
            </h2>
            <div className="mt-2 flex flex-wrap justify-center items-center gap-3 text-xs text-slate-600">
              <span>{personalInfo.phone}</span>
              <span>|</span>
              <span>{personalInfo.email}</span>
              <span>|</span>
              <span>Quezon City</span>
            </div>
            <div className="mt-1 text-xs text-slate-600">
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-800 font-medium">
                {websiteUrl}
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
              WORK EXPERIENCE
            </h3>

            <div className="space-y-4">
              {/* National Children's Hospital */}
              <div>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span className="text-sm">National Children's Hospital</span>
                  <span className="text-xs text-slate-600">February 2025 - May 2025</span>
                </div>
                <div className="italic font-semibold text-slate-700 mb-1.5">IT Internship</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                  <li>Assisted in basic networking tasks including cable management and device setup.</li>
                  <li>Supported IT staff with hardware troubleshooting and daily technical tasks.</li>
                </ul>
              </div>

              {/* Five Star Bus Co */}
              <div>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span className="text-sm">Five Star Bus Company</span>
                  <span className="text-xs text-slate-600">July 2025 - Present</span>
                </div>
                <div className="italic font-semibold text-slate-700 mb-1.5">Junior I.T Analyst</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                  {workExperience[0].description.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              EDUCATION
            </h3>
            <div className="flex justify-between items-baseline font-bold text-slate-900">
              <span className="text-sm">Universidad de Manila</span>
              <span className="text-xs text-slate-600" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>2021 - 2025</span>
            </div>
            <div className="font-semibold text-slate-800">Bachelor of Science in Information Technology</div>
            <div className="text-slate-600 text-xs mt-1">
              Relevant Subjects: Web Development, Computer Networks, Database Management
            </div>
            <div className="text-slate-700 text-xs font-medium mt-0.5">
              Capstone / Project: School Cafeteria Website using PHP and MongoDB
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              TECHNICAL SKILLS
            </h3>
            <div className="space-y-1.5 text-slate-800">
              <div>
                <strong className="text-slate-900">Networking:</strong> TCP/IP, DNS, DHCP, LAN, VLANs, firewall rules, router and switch configuration
              </div>
              <div>
                <strong className="text-slate-900">Tools:</strong> Microsoft Office, GitHub, VirtualBox, AnyDesk, Remote Desktop, Visual Studio Code, XAMPP, Command Prompt, PowerShell
              </div>
              <div>
                <strong className="text-slate-900">Support:</strong> Hardware and software troubleshooting, account setup, printer troubleshooting, remote support, ticket documentation, incident escalation, and preventive maintenance
              </div>
              <div>
                <strong className="text-slate-900">Progamming Language:</strong> C++, Laravel Blade, PHP
              </div>
              <div>
                <strong className="text-slate-900">Database:</strong> MySQL, MongoDB
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              PROJECTS
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-bold text-slate-900 text-sm">
                  IT Ticketing System | Five Star Bus Company
                </div>
                <p className="text-slate-700 text-xs mt-0.5">
                  • Developing a system for logging, categorizing, prioritizing, tracking, and documenting IT support requests and resolutions
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-900 text-sm">
                  ID Management System | Five Star Bus Company
                </div>
                <p className="text-slate-700 text-xs mt-0.5">
                  A web-based ID issuance and tracking platform that allows users to submit ID requests, monitor real-time processing status.
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-900 text-sm">
                  School Cafeteria Web Portal | Capstone
                </div>
                <p className="text-slate-700 text-xs mt-0.5">
                  • Academic Capstone Project built for Universidad de Manila to streamline food ordering, inventory monitoring, and cafeteria operations.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
