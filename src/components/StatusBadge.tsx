import { CircleAlert, Check, Info, ShieldCheck } from "../lib/icons";
import { EvidenceStatus } from "../types";

const labels: Record<EvidenceStatus, string> = {
  missing: "Evidence missing",
  uploaded: "Processing",
  verified: "Established",
  unreadable: "Unreadable",
  conflicting: "Conflicting",
  human_review: "Human review"
};

export function StatusBadge({ status, large = false }: { status: EvidenceStatus | "sufficient" | "additional" | "human_review"; large?: boolean }) {
  const kind = status === "sufficient" ? "verified" : status === "additional" ? "uploaded" : status;
  const Icon = kind === "verified" ? Check : kind === "missing" ? CircleAlert : kind === "human_review" ? ShieldCheck : Info;
  const text = status in labels ? labels[status as EvidenceStatus] : status === "sufficient" ? "Application can proceed" : status === "additional" ? "Additional evidence required" : "Human review required";
  return <span className={`status-badge status-${kind} ${large ? "status-badge--large" : ""}`}><Icon size={large ? 17 : 14} />{text}</span>;
}