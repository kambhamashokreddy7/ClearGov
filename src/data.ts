import { Service } from "./types";

export const services: Service[] = [
  {
    id: "student-scholarship",
    name: "Student Scholarship",
    category: "Education",
    description: "Check scholarship requirements and supporting evidence.",
    detail: "Understand the requirements before starting your application.",
    icon: "graduation",
    eligibility: ["Academic qualification", "Income requirement", "Residency requirement", "Identity verification"],
    evidence: ["Identity document", "Academic / marks certificate", "Income certificate", "Residence certificate"]
  },
  {
    id: "housing-assistance",
    name: "Housing Assistance",
    category: "Housing",
    description: "Understand requirements for housing support.",
    detail: "Review housing support requirements and prepare the right evidence.",
    icon: "home",
    eligibility: ["Housing need", "Income requirement", "Residency requirement"],
    evidence: ["Identity document", "Proof of address", "Income certificate"]
  },
  {
    id: "education-support",
    name: "Education Support",
    category: "Education",
    description: "Review educational assistance requirements.",
    detail: "Find out what information and evidence education support services need.",
    icon: "book",
    eligibility: ["Enrolment or admission", "Household circumstances"],
    evidence: ["Identity document", "Enrolment confirmation", "Supporting circumstances evidence"]
  },
  {
    id: "financial-assistance",
    name: "Financial Assistance",
    category: "Financial Support",
    description: "Understand evidence needed for financial support.",
    detail: "Review the evidence needed to request financial assistance.",
    icon: "wallet",
    eligibility: ["Financial circumstances", "Residency requirement"],
    evidence: ["Identity document", "Income certificate", "Bank or payment evidence"]
  },
  {
    id: "healthcare-assistance",
    name: "Healthcare Assistance",
    category: "Healthcare",
    description: "Review information and supporting evidence requirements.",
    detail: "Understand the information needed to request healthcare assistance.",
    icon: "heart",
    eligibility: ["Healthcare need", "Residency requirement"],
    evidence: ["Identity document", "Healthcare supporting document", "Residence certificate"]
  },
  {
    id: "community-support",
    name: "Community Support",
    category: "Community",
    description: "Explore available public-service assistance.",
    detail: "Review available community support options before you apply.",
    icon: "users",
    eligibility: ["Community support need", "Residency requirement"],
    evidence: ["Identity document", "Residence certificate", "Supporting circumstances evidence"]
  },
  {
    id: "employment-support",
    name: "Employment Support",
    category: "Employment",
    description: "Find support for training, job search, and employment.",
    detail: "Understand what to prepare for employment support.",
    icon: "briefcase",
    eligibility: ["Employment status", "Residency requirement"],
    evidence: ["Identity document", "Employment history or status", "Residence certificate"]
  },
  {
    id: "family-support",
    name: "Family Support",
    category: "Family",
    description: "Review support options for families and dependants.",
    detail: "See the evidence needed for family support services.",
    icon: "family",
    eligibility: ["Family circumstances", "Residency requirement"],
    evidence: ["Identity document", "Family relationship evidence", "Residence certificate"]
  }
];