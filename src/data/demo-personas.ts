// Demo personas for EIDS presentation
// These personas allow presenters to demonstrate different user roles/views

export interface DemoPersona {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  color: string; // accent color for the persona
  description: string;
}

export const demoPersonas: DemoPersona[] = [
  {
    id: "dr-sarah-chen",
    name: "Dr. Sarah Chen",
    role: "Principal Investigator",
    department: "Clinical Research",
    avatar: "/avatars/sarah-chen.jpg",
    color: "emerald",
    description: "Reviews and approves grant applications for clinical trials",
  },
  {
    id: "james-rodriguez",
    name: "James Rodriguez",
    role: "Grants Administrator",
    department: "Program Management",
    avatar: "/avatars/james-rodriguez.jpg",
    color: "cyan",
    description: "Manages grant lifecycle and compliance documentation",
  },
  {
    id: "maria-thompson",
    name: "Maria Thompson",
    role: "Financial Analyst",
    department: "Budget & Finance",
    avatar: "/avatars/maria-thompson.jpg",
    color: "amber",
    description: "Oversees budget allocation and financial reporting",
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "System Administrator",
    department: "IT Operations",
    avatar: "/avatars/david-kim.jpg",
    color: "violet",
    description: "Manages system configuration and user access",
  },
];

// Get persona by ID
export function getPersonaById(id: string): DemoPersona | undefined {
  return demoPersonas.find((p) => p.id === id);
}

// Default persona when no demo session is active
export const defaultPersona = demoPersonas[0];
