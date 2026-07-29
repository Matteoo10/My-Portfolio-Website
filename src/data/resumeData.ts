import { WorkExperience, EducationItem, Ticket, NetworkNode, SkillGroup, ProjectItem } from '../types';

export const personalInfo = {
  name: "Christian Matthew P. Dator",
  title: "IT Support Specialist | Junior IT Analyst",
  phone: "0954-455-2990",
  email: "datorchristian10@gmail.com",
  location: "Quezon City, Philippines",
  profileImage: `${import.meta.env.BASE_URL}profile.png`,
  summary: "Information Technology graduate with hands-on experience in technical support, network configuration, ticketing management, incident management, and IT operations. Skilled in troubleshooting hardware, software, printer, network, and user access issues, with experience supporting Ubiquiti network devices, VLANs, firewall rules, bandwidth management, and 24/7 support requirements. Reliable and detail-oriented, with a strong willingness to learn and contribute to stable and secure IT operations.",
  github: "https://github.com/datorchristian10",
  linkedin: "https://www.linkedin.com/in/christian-matthew-dator-836ab0348",
  status: "Available for Junior IT Analyst & IT Support Roles"
};

export const workExperience: WorkExperience[] = [
  {
    id: "fivestar",
    role: "Junior I.T Analyst",
    company: "Five Star Bus Company",
    period: "July 2025 - Present",
    location: "Quezon City, PH",
    type: "fulltime",
    tags: ["Ubiquiti UniFi", "VLANs", "Incident Escalation", "Printer Support", "Hardware Maintenance", "PowerShell"],
    description: [
      "Provide first-level technical support for hardware, software, network, printer, and user access issues across company operations.",
      "Troubleshoot, repair, and maintain desktop computers, laptops, printers, POS systems, and essential IT equipment.",
      "Configure, monitor, and maintain Ubiquiti network devices, including access points, switches, and routers.",
      "Assist in network monitoring and security implementation, including VLANs, firewall rules, and bandwidth management.",
      "Manage and document support tickets, incident reports, troubleshooting steps, and resolutions in ticketing workflow.",
      "Assist in incident management by prioritizing issues, escalating unresolved cases, and coordinating with IT staff or vendors.",
      "Monitor IT systems and network devices to support continuous operations and 24/7 support requirements.",
      "Maintain user accounts, network documentation, preventive maintenance records, and IT equipment inventory."
    ]
  },
  {
    id: "nch",
    role: "IT Internship",
    company: "National Children's Hospital",
    period: "February 2025 - May 2025",
    location: "Quezon City, PH",
    type: "internship",
    tags: ["Network Cabling", "Hardware Troubleshooting", "Desktop Setup", "Helpdesk Support"],
    description: [
      "Assisted in basic networking tasks including cable management, patch panel mapping, and network device setup.",
      "Supported IT staff with hardware troubleshooting, desktop deployment, software patching, and daily technical tasks."
    ]
  }
];

export const education: EducationItem = {
  degree: "Bachelor of Science in Information Technology",
  institution: "Universidad de Manila",
  period: "2021 - 2025",
  relevantSubjects: [
    "Web Development",
    "Computer Networks",
    "Database Management",
    "Systems Analysis & Design",
    "Information Security"
  ],
  capstone: {
    title: "School Cafeteria Website using PHP and MongoDB",
    techStack: ["PHP", "MongoDB", "Laravel Blade Syntax", "Bootstrap/CSS", "JavaScript"],
    description: "Designed and implemented a web-based portal for managing school cafeteria menu items, online order queuing, real-time inventory tracking, and user account management."
  }
};

export const initialTickets: Ticket[] = [
  {
    id: "INC-1042",
    title: "Ticketing Terminal 3 UniFi AP Intermittent Dropouts",
    category: "Networking",
    priority: "P1 - Critical",
    status: "Resolved",
    reporter: "Dispatch Office - Terminal 3",
    department: "Operations & Ticketing",
    createdAt: "2026-07-27 08:15 AM",
    resolvedAt: "2026-07-27 09:10 AM",
    equipment: "Ubiquiti UniFi AP AC Pro (MAC: 78:8A:20:C4:11:92)",
    description: "Ticketing machines at Terminal 3 lost Wi-Fi connectivity to the main server, slowing down passenger ticket printing.",
    troubleshootingSteps: [
      "1. Ran ping tests from gateway (192.168.20.1) to AP IP (192.168.10.45). Received request timeouts.",
      "2. Checked UniFi Network Controller dashboard; observed switch port #14 dropping packets.",
      "3. Verified POE power draw and cabling connection at patch panel.",
      "4. SSH'd into switch, bounced POE on Port 14 using command line.",
      "5. Re-applied VLAN 20 (Operations) tagging rules on port 14 and verified DHCP lease renewal."
    ],
    commandsUsed: [
      "ping 192.168.20.1 -t",
      "tracert 10.0.0.1",
      "netsh wlan show interfaces",
      "Get-NetIPConfiguration"
    ],
    resolutionNotes: "Re-seated POE Ethernet termination cable, updated switch port VLAN 20 assignment, and locked AP channel to 36 (5GHz) to avoid channel overlap. Ping response stabilized at 2ms."
  },
  {
    id: "INC-1039",
    title: "Thermal Ticket Printer Spooler Error on Workstation WKS-04",
    category: "Hardware/Printer",
    priority: "P2 - High",
    status: "Resolved",
    reporter: "Ticket Counter #2",
    department: "Customer Service",
    createdAt: "2026-07-26 02:30 PM",
    resolvedAt: "2026-07-26 03:05 PM",
    equipment: "Epson TM-T88VI Thermal Receipt Printer (USB)",
    description: "Workstation error popup: 'Print spooler service corrupt or stalled'. Printer fails to print passenger tickets.",
    troubleshootingSteps: [
      "1. Inspected physical USB connections and paper roll status.",
      "2. Opened Services (services.msc) and identified 'Print Spooler' stuck in 'Stopping' state.",
      "3. Opened PowerShell with Administrator privileges.",
      "4. Cleared corrupt print jobs from C:\\Windows\\System32\\spool\\PRINTERS.",
      "5. Restarted Print Spooler service and re-installed vendor driver."
    ],
    commandsUsed: [
      "net stop spooler",
      "del /Q /F /S \"%systemroot%\\System32\\Spool\\Printers\\*.*\"",
      "net start spooler"
    ],
    resolutionNotes: "Cleared 4 corrupt print spool files, restarted spooler service, and updated USB driver. Successfully printed test ticket."
  },
  {
    id: "INC-1035",
    title: "Network Isolation & Bandwidth Throttling on Guest Wi-Fi",
    category: "Networking",
    priority: "P3 - Medium",
    status: "Resolved",
    reporter: "IT Operations Lead",
    department: "IT Infrastructure",
    createdAt: "2026-07-25 11:00 AM",
    resolvedAt: "2026-07-25 11:45 AM",
    equipment: "Ubiquiti Security Gateway (USG-PRO-4)",
    description: "High bandwidth consumption on Guest Wi-Fi was saturating main ISP pipeline, causing latency spikes for administrative workstations.",
    troubleshootingSteps: [
      "1. Opened Ubiquiti UniFi Network Manager.",
      "2. Analyzed DPI (Deep Packet Inspection) statistics to isolate top bandwidth consumers.",
      "3. Identified video streaming traffic on VLAN 40 (Guest Network).",
      "4. Configured guest bandwidth user profile to cap Download at 5 Mbps and Upload at 2 Mbps per client.",
      "5. Enabled Firewall isolation rule blocking VLAN 40 from accessing VLAN 10 (Management) and VLAN 20 (Operations)."
    ],
    commandsUsed: [
      "ipconfig /all",
      "nslookup internal.fivestar.local"
    ],
    resolutionNotes: "Implemented strict bandwidth profile limits on UniFi Controller for Guest Wi-Fi and updated firewall rule group to isolate guest traffic completely."
  },
  {
    id: "INC-1031",
    title: "User Account Lockout & Remote Desktop Permission Setup",
    category: "Software/Access",
    priority: "P4 - Low",
    status: "Resolved",
    reporter: "Accounting Dept - Maria S.",
    department: "Finance",
    createdAt: "2026-07-24 09:15 AM",
    resolvedAt: "2026-07-24 09:35 AM",
    equipment: "Dell Latitude Laptop / Windows 11 Pro",
    description: "Employee locked out of Active Directory account after password expiration and needed Remote Desktop access to server.",
    troubleshootingSteps: [
      "1. Verified user identity via phone call and manager approval.",
      "2. Accessed AD Administrative Center / Account Management.",
      "3. Unlocked account and set temporary one-time password.",
      "4. Added user account to 'Remote Desktop Users' security group.",
      "5. Instructed user through AnyDesk remote assistance to log in and update password."
    ],
    commandsUsed: [
      "Get-ADUser -Identity m_santos",
      "Unlock-ADAccount -Identity m_santos"
    ],
    resolutionNotes: "Account unlocked, temporary password issued, Remote Desktop permissions verified, and password reset successfully forced upon first login."
  }
];

export const networkNodes: NetworkNode[] = [
  {
    id: "usg-gateway",
    name: "Ubiquiti Security Gateway Pro",
    type: "gateway",
    ip: "192.168.1.1",
    subnet: "255.255.255.0",
    vlan: "VLAN 1 (Native)",
    vlanName: "Management Network",
    status: "Online",
    model: "USG-PRO-4 Dual-WAN Gateway",
    details: "Core edge router providing WAN load balancing, DPI packet inspection, and central firewall routing between VLANs.",
    firewallRules: [
      "Rule 2001: Drop Guest (VLAN 40) -> Corporate (VLAN 10/20)",
      "Rule 2002: Allow Established & Related Connections",
      "Rule 2003: Enable Smart Queues (FQ_CODEL) for WAN Traffic"
    ]
  },
  {
    id: "unifi-switch-24",
    name: "UniFi Switch 24 POE+ (250W)",
    type: "switch",
    ip: "192.168.1.10",
    subnet: "255.255.255.0",
    vlan: "Trunk (All VLANs)",
    vlanName: "Core Switching",
    status: "Online",
    model: "US-24-250W Managed Switch",
    details: "Central PoE switch supplying power and VLAN tagging to access points, IP cameras, and terminal workstations.",
    bandwidthCap: "1 Gbps Full Duplex Uplink"
  },
  {
    id: "ap-terminal-3",
    name: "UniFi AP AC Pro - Terminal 3",
    type: "ap",
    ip: "192.168.10.45",
    subnet: "255.255.255.0",
    vlan: "VLAN 20 / VLAN 40 Tagged",
    vlanName: "Operations & Guest Wireless",
    status: "Online",
    model: "UAP-AC-PRO (Dual Band)",
    details: "High-density access point serving ticketing devices, mobile dispatch scanners, and public guest Wi-Fi.",
    bandwidthCap: "Per-user Guest Cap: 5Mbps DL / 2Mbps UL"
  },
  {
    id: "wks-ticketing-01",
    name: "Ticketing POS Workstation #1",
    type: "workstation",
    ip: "192.168.20.101",
    subnet: "255.255.255.0",
    vlan: "VLAN 20",
    vlanName: "Bus Ticketing & Dispatch",
    status: "Online",
    model: "Dell OptiPlex 3080 Desktop",
    details: "Dedicated counter terminal running custom ticketing software and connected to thermal receipt printer."
  },
  {
    id: "printer-thermal-02",
    name: "Network Ticket Printer - Counter 2",
    type: "printer",
    ip: "192.168.20.202",
    subnet: "255.255.255.0",
    vlan: "VLAN 20",
    vlanName: "Bus Ticketing & Dispatch",
    status: "Online",
    model: "Epson TM-T88VI Network Thermal Printer",
    details: "High-speed thermal receipt printer for passenger ticketing with fixed static IP binding."
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Networking & Infrastructure",
    iconName: "Network",
    description: "Hands-on experience configuring, monitoring, and troubleshooting enterprise networks.",
    skills: [
      { name: "TCP/IP, DNS, DHCP, LAN", level: 60, highlight: true },
      { name: "VLAN Segmentation & Tagging", level: 55, highlight: true },
      { name: "Ubiquiti UniFi Devices (AP, Switches, Gateways)", level: 58, highlight: true },
      { name: "Firewall Rules & Security Policies", level: 52, highlight: true },
      { name: "Router & Switch Configuration", level: 56, highlight: true },
      { name: "Bandwidth Management & QoS", level: 50 }
    ]
  },
  {
    category: "IT Support & Administration",
    iconName: "Wrench",
    description: "First-level technical support, incident escalation, and hardware maintenance.",
    skills: [
      { name: "Hardware & Desktop PC Repair", level: 80, highlight: true },
      { name: "Printer Troubleshooting & Drivers", level: 78, highlight: true },
      { name: "Support Ticket & Incident Logging", level: 82, highlight: true },
      { name: "Remote Support (AnyDesk, RDP)", level: 78, highlight: true },
      { name: "User Account & Access Management", level: 72 },
      { name: "Preventive Maintenance & Inventory", level: 75 }
    ]
  },
  {
    category: "Tools & Utilities",
    iconName: "Terminal",
    description: "Command line interfaces, system tools, and diagnostic software.",
    skills: [
      { name: "Command Prompt & PowerShell Scripts", level: 70, highlight: true },
      { name: "VirtualBox / VM Environment Setup", level: 68 },
      { name: "GitHub", level: 65 },
      { name: "Visual Studio Code & XAMPP", level: 75 },
      { name: "Microsoft 365", level: 82 }
    ]
  },
  {
    category: "Web Development & Databases",
    iconName: "Code",
    description: "Building web platforms and application logic.",
    skills: [
      { name: "C++ Programming", level: 25, highlight: true },
      { name: "Laravel Blade Syntax", level: 28, highlight: true },
      { name: "JavaScript", level: 30, highlight: true }
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    id: "it-ticketing-system",
    title: "IT Support Ticketing System",
    status: "In Progress",
    category: "IT Support / Systems",
    description: "Developing a web-based system for logging, categorizing, prioritizing, tracking, and documenting IT support requests and resolutions across organizations.",
    features: [
      "Ticket creation with auto-classification based on severity (P1 Critical to P4 Low)",
      "Resolution timer & SLA tracking dashboard for IT support analysts",
      "Equipment asset tagging & history log linked to each support ticket",
      "Knowledgebase repository for recurring hardware/network troubleshooting steps",
      "Automated email/notification prompts upon ticket escalation"
    ],
    techStack: ["PHP", "Laravel Blade Syntax", "MySQL", "Tailwind CSS", "JavaScript"],
    architecture: "MVC Architecture with RESTful route handlers, relational MySQL database for users and ticket logs, and role-based access control (User vs. Admin/Analyst).",
    demoType: "ticketing"
  },
  {
    id: "school-cafeteria-web",
    title: "School Cafeteria Web Portal (Capstone)",
    status: "Completed",
    category: "Web Development",
    description: "Academic Capstone Project built for Universidad de Manila to streamline food ordering, inventory monitoring, and cafeteria operations.",
    features: [
      "Dynamic menu item catalog with stock availability indicators",
      "Online order queuing system reducing physical counter wait times",
      "Admin portal for cafeteria staff to update daily menu items and view daily revenue reports",
      "MongoDB document storage for quick unstructured order metadata and user preference profiles",
      "Responsive UI optimized for desktop computers and mobile devices"
    ],
    techStack: ["PHP", "MongoDB", "Laravel Blade Syntax", "Bootstrap / CSS", "JavaScript"],
    architecture: "PHP backend integrated with MongoDB PHP extension, handling JSON documents for flexible catalog schema and fast read operations.",
    demoType: "cafeteria"
  }
];
