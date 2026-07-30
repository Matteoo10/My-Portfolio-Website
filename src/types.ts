export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  tags: string[];
  type: 'fulltime' | 'internship';
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  relevantSubjects: string[];
  capstone: {
    title: string;
    techStack: string[];
    description: string;
  };
}

export interface Ticket {
  id: string;
  title: string;
  category: 'Networking' | 'Hardware/Printer' | 'Software/Access' | 'Systems/Operations';
  priority: 'P1 - Critical' | 'P2 - High' | 'P3 - Medium' | 'P4 - Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Escalated';
  reporter: string;
  department: string;
  createdAt: string;
  resolvedAt?: string;
  description: string;
  troubleshootingSteps: string[];
  commandsUsed?: string[];
  resolutionNotes: string;
  equipment: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  type: 'gateway' | 'switch' | 'ap' | 'workstation' | 'printer' | 'server';
  ip: string;
  subnet: string;
  vlan: string;
  vlanName: string;
  status: 'Online' | 'Warning' | 'Maintenance';
  details: string;
  firewallRules?: string[];
  bandwidthCap?: string;
  model?: string;
}

export interface SkillGroup {
  category: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // percentage
    highlight?: boolean;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  status: 'In Progress' | 'Completed';
  category: 'IT Support / Systems' | 'Web Development' | 'ID Management / Systems';
  description: string;
  features: string[];
  techStack: string[];
  architecture?: string;
  demoType: 'ticketing' | 'cafeteria' | 'id-management';
}
