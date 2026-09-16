import { Application } from "./types.js";

export function assess(application: Application): Application["assessment"] {
  const missing = application.evidence.filter((item) => item.status === "missing");
  const established = application.evidence.filter((item) => item.status !== "missing").map((item) => item.requirement);
  const complete = missing.length === 0;
  return {
    outcome: complete ? "sufficient" : "additional",
    established,
    notEstablished: missing.map((item) => item.requirement),
    issues: missing.length ? missing.map((item) => `${item.requirement} evidence has not been submitted.`) : [],
    nextAction: complete ? "Review the decision details and submit your application." : `Submit ${missing[0]?.requirement.toLowerCase() ?? "the missing evidence"}.`,
    explanation: complete
      ? "All required evidence has been submitted. The application can move to the next stage."
      : "ClearGov could not establish every requirement because some supporting evidence is still missing. The application cannot currently proceed until the outstanding evidence is submitted.",
    timeline: [
      { label: "Application started", complete: true, date: application.createdAt },
      { label: "Information submitted", complete: Object.keys(application.information).length > 0 },
      { label: "Evidence submitted", complete: application.evidence.some((item) => item.status !== "missing") },
      { label: "Evidence assessed", complete: true, date: new Date().toISOString() },
      { label: "Applicant action required", complete: !complete }
    ]
  };
}