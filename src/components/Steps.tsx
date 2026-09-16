import { Check } from "../lib/icons";

const steps = ["Choose a service", "Provide information", "Submit evidence", "Assessment", "Decision", "Next action"];

export function HowItWorks() {
  return (
    <div className="how-card">
      <div className="how-head"><div><span className="eyebrow">A clearer way to apply</span><h2>How ClearGov works</h2></div><span className="steps-note">Six simple steps</span></div>
      <div className="how-steps">{steps.map((step, index) => <div className="how-step" key={step}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><span>{step}</span>{index < steps.length - 1 && <span className="step-connector" />}</div>)}</div>
      <p className="how-copy">ClearGov checks your information and supporting evidence and explains what has been established, what needs attention, and what you should do next.</p>
    </div>
  );
}

export function ProgressSteps({ current }: { current: number }) {
  const labels = ["Service", "Information", "Evidence", "Assessment", "Decision"];
  return <div className="progress-steps" aria-label="Application progress">{labels.map((label, index) => <div className={`progress-item ${index < current ? "is-complete" : ""} ${index === current ? "is-current" : ""}`} key={label}><span>{index < current ? <Check size={14} /> : index + 1}</span><b>{label}</b></div>)}</div>;
}