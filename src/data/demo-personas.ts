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
  // RBAC permissions for data masking demo
  canViewUnmaskedPII?: boolean;
  permissions?: string[];
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
    canViewUnmaskedPII: false,
    permissions: ["view_applications", "create_application", "view_analytics"],
  },
  {
    id: "james-rodriguez",
    name: "James Rodriguez",
    role: "Grants Administrator",
    department: "Program Management",
    avatar: "/avatars/james-rodriguez.jpg",
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
    avatar: "/avatars/emily-carter.jpg",
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
    avatar: "/avatars/maria-thompson.jpg",
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
    avatar: "/avatars/david-kim.jpg",
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
