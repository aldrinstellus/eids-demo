// Demo personas for EIDS presentation
// These personas allow presenters to demonstrate different user roles/views

export type Gender = "female" | "male";

export interface DemoPersona {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  gender: Gender;
  color: string; // accent color for the persona
  description: string;
  // RBAC permissions for data masking demo
  canViewUnmaskedPII?: boolean;
  permissions?: string[];
}

// Using randomuser.me portraits for realistic avatars
// Each persona has a consistent seed-based avatar
export const demoPersonas: DemoPersona[] = [
  {
    id: "dr-sarah-chen",
    name: "Dr. Sarah Chen",
    role: "Principal Investigator",
    department: "Clinical Research",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    gender: "female",
    color: "emerald",
    description: "Reviews and approves grant applications for clinical trials",
    canViewUnmaskedPII: false,
    permissions: ["view_applications", "create_application", "view_analytics"],
  },
  {
    id: "james-rodriguez",
    name: "James Rodriguez",
    role: "Grants Administrator",
    department: "Program Management",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    gender: "male",
    color: "cyan",
    description: "Manages grant lifecycle and compliance documentation",
    canViewUnmaskedPII: false,
    permissions: ["view_applications", "review_applications", "view_analytics"],
  },
  {
    id: "dr-emily-carter",
    name: "Dr. Emily Carter",
    role: "Clinician",
    department: "Veterans Health",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    gender: "female",
    color: "rose",
    description: "Healthcare provider with access to patient records",
    canViewUnmaskedPII: true, // Clinicians can see unmasked patient data
    permissions: ["view_applications", "view_patient_records", "view_unmasked_pii"],
  },
  {
    id: "maria-thompson",
    name: "Maria Thompson",
    role: "Financial Analyst",
    department: "Budget & Finance",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    gender: "female",
    color: "amber",
    description: "Oversees budget allocation and financial reporting",
    canViewUnmaskedPII: false,
    permissions: ["view_applications", "financial_review", "view_analytics"],
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "System Administrator",
    department: "IT Operations",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    gender: "male",
    color: "violet",
    description: "Manages system configuration and user access (sees masked data)",
    canViewUnmaskedPII: false, // System Admin sees MASKED data per requirements
    permissions: ["manage_users", "view_audit_logs", "system_config"],
  },
];

// Get persona by ID
export function getPersonaById(id: string): DemoPersona | undefined {
  return demoPersonas.find((p) => p.id === id);
}

// Check if persona can view unmasked PII
export function canViewUnmaskedPII(personaId: string | null): boolean {
  if (!personaId) return false;
  const persona = getPersonaById(personaId);
  return persona?.canViewUnmaskedPII ?? false;
}

// Default persona when no demo session is active
export const defaultPersona = demoPersonas[0];
