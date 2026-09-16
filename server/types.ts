export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  detail: string;
  icon: string;
  eligibility: string[];
  evidence: string[];
};

export type EvidenceItem = {
  requirement: string;
  required: string;
  fileName?: string;
  status: "missing" | "uploaded" | "verified" | "unreadable" | "conflicting" | "human_review";
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
  assessment?: {
    outcome: "sufficient" | "condition" | "additional" | "human_review";
    established: string[];
    notEstablished: string[];
    issues: string[];
    nextAction: string;
    explanation: string;
    timeline: { label: string; complete: boolean; date?: string }[];
  };
};