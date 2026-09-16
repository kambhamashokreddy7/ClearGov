export type ServiceCategory =
  | "Education"
  | "Housing"
  | "Financial Support"
  | "Healthcare"
  | "Community"
  | "Employment"
  | "Family"
  | "Transport"
  | "Other Public Services";

export type EvidenceStatus =
  | "missing"
  | "uploaded"
  | "verified"
  | "unreadable"
  | "conflicting"
  | "human_review";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  detail: string;
  icon: string;
  eligibility: string[];
  evidence: string[];
};

export type Application = {
  id: string;
  serviceId: string;
  serviceName: string;
  createdAt: string;
  updatedAt: string;
  currentStep: number;
  information: Record<string, string>;
  evidence: EvidenceItem[];
  assessment?: Assessment;
};

export type EvidenceItem = {
  requirement: string;
  required: string;
  fileName?: string;
  status: EvidenceStatus;
  extracted?: Record<string, string>;
};

export type Assessment = {
  outcome: "sufficient" | "condition" | "additional" | "human_review";
  established: string[];
  notEstablished: string[];
  issues: string[];
  nextAction: string;
  explanation: string;
  timeline: { label: string; complete: boolean; date?: string }[];
};

export const categories: ServiceCategory[] = [
  "Education",
  "Housing",
  "Financial Support",
  "Healthcare",
  "Community",
  "Employment",
  "Family",
  "Transport",
  "Other Public Services"
];