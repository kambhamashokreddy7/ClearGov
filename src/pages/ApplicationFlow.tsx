import { ChangeEvent, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleAlert, FileCheck2, FileText, Info, Upload } from "../lib/icons";
import { Application, EvidenceItem, Service } from "../types";
import { ProgressSteps } from "../components/Steps";
import { StatusBadge } from "../components/StatusBadge";

const infoFields = [
  ["fullName", "Full name", "Enter your legal name"],
  ["dateOfBirth", "Date of birth", "DD / MM / YYYY"],
  ["applicantId", "Applicant ID", "If you have one"],
  ["institution", "Institution", "School, college, or university"],
  ["academicScore", "Academic score", "Your latest score or grade"],
  ["annualFamilyIncome", "Annual family income", "Include the currency"],
  ["residence", "Residence", "Town, city, or region"]
];

export function ApplicationFlow({ service, application, onSave, onExit }: { service: Service; application: Application | null; onSave: (app: Application) => void; onExit: () => void }) {
  const [step, setStep] = useState(application?.currentStep ?? 0);
  const [information, setInformation] = useState<Record<string, string>>(application?.information ?? {});
  const [evidence, setEvidence] = useState<EvidenceItem[]>(application?.evidence ?? service.evidence.map((required) => ({ requirement: required, required, status: "missing" })));
  const [saved, setSaved] = useState(false);
  const currentApp = application ?? { id: "draft", serviceId: service.id, serviceName: service.name, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), currentStep: step, information, evidence };
  const canContinue = step !== 1 || Boolean(information.fullName && information.institution);
  const outcome = useMemo(() => {
    const missing = evidence.filter((item) => item.status === "missing");
    return { missing, complete: missing.length === 0 };
  }, [evidence]);
  const update = (key: string, value: string) => { setInformation((current) => ({ ...current, [key]: value })); setSaved(false); };
  const continueFlow = () => { if (!canContinue) return; const next = Math.min(step + 1, 4); const nextApp = { ...currentApp, currentStep: next, information, evidence, updatedAt: new Date().toISOString() }; onSave(nextApp); setStep(next); };
  const fileSelected = (index: number, event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; setEvidence((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, fileName: file.name, status: "uploaded" } : item)); setSaved(false); };
  return <main className="page-shell flow-page"><div className="flow-top"><button className="back-link" onClick={onExit}><ArrowLeft size={16} /> Exit application</button><span className="save-note">{saved ? <><Check size={14} /> Saved</> : "Draft application"}</span></div><div className="flow-header"><div><span className="eyebrow">Application for</span><h1>{service.name}</h1></div><ProgressSteps current={step} /></div>
    <div className="flow-card">
      {step === 0 && <StepService service={service} onContinue={continueFlow} />}
      {step === 1 && <StepInformation values={information} onChange={update} onContinue={continueFlow} canContinue={canContinue} />}
      {step === 2 && <StepEvidence evidence={evidence} onSelect={fileSelected} onContinue={continueFlow} />}
      {step >= 3 && <StepAssessment evidence={evidence} outcome={outcome} onBack={() => setStep(2)} onContinue={onExit} />}
    </div>
  </main>;
}

function StepService({ service, onContinue }: { service: Service; onContinue: () => void }) {
  return <div className="flow-step"><div className="step-intro"><span className="step-kicker">Step 1 of 5</span><h2>Check the service details</h2><p>Make sure this is the service you want to apply for. You can review the requirements before continuing.</p></div><div className="selected-service"><div className="service-icon"><FileText size={20} /></div><div><span className="service-category">{service.category}</span><b>{service.name}</b><small>{service.detail}</small></div><Check className="selected-check" size={19} /></div><div className="mini-requirements"><div><b>Eligibility</b><span>{service.eligibility.length} requirements</span></div><div><b>Evidence</b><span>{service.evidence.length} documents may be needed</span></div></div><FlowFooter label="Continue" onClick={onContinue} /></div>;
}
function StepInformation({ values, onChange, onContinue, canContinue }: { values: Record<string, string>; onChange: (key: string, value: string) => void; onContinue: () => void; canContinue: boolean }) {
  return <div className="flow-step"><div className="step-intro"><span className="step-kicker">Step 2 of 5</span><h2>Tell us about yourself</h2><p>Use the information that matches your supporting evidence. Fields marked <b>*</b> are required.</p></div><div className="why-box"><Info size={18} /><div><b>Why we ask for this information</b><p>We use these details to identify the requirements that apply to your application and compare them with your evidence.</p></div></div><div className="form-grid">{infoFields.map(([key, label, placeholder]) => <label key={key} className={key === "fullName" || key === "institution" ? "field field--required" : "field"}><span>{label}{(key === "fullName" || key === "institution") && " *"}</span><input value={values[key] ?? ""} onChange={(event) => onChange(key, event.target.value)} placeholder={placeholder} /></label>)}</div>{!canContinue && <div className="form-error"><CircleAlert size={16} /> Add your full name and institution to continue.</div>}<FlowFooter label="Continue to evidence" onClick={onContinue} disabled={!canContinue} /></div>;
}
function StepEvidence({ evidence, onSelect, onContinue }: { evidence: EvidenceItem[]; onSelect: (index: number, event: ChangeEvent<HTMLInputElement>) => void; onContinue: () => void }) {
  return <div className="flow-step"><div className="step-intro"><span className="step-kicker">Step 3 of 5</span><h2>Submit your evidence</h2><p>Upload the documents available to you. ClearGov will show you what has been established and what needs attention.</p></div><div className="upload-list">{evidence.map((item, index) => <div className="upload-card" key={item.requirement}><div className="upload-card-top"><div className="upload-requirement"><span className="upload-number">{String(index + 1).padStart(2, "0")}</span><div><b>{item.requirement}</b><small>Required: {item.required}</small></div></div>{item.status !== "missing" && <StatusBadge status={item.status} />}</div>{item.fileName ? <div className="file-added"><FileCheck2 size={17} /><span>{item.fileName}</span><small>Ready for assessment</small></div> : <label className="upload-drop"><Upload size={18} /><span><b>Upload document</b><small>PDF, JPG, or PNG · Max 10 MB</small></span><input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => onSelect(index, event)} /></label>}</div>)}</div><div className="upload-note"><Info size={16} /> Don’t have a document ready? You can continue and return to it later.</div><FlowFooter label="Continue to assessment" onClick={onContinue} /></div>;
}
function StepAssessment({ evidence, outcome, onBack, onContinue }: { evidence: EvidenceItem[]; outcome: { missing: EvidenceItem[]; complete: boolean }; onBack: () => void; onContinue: () => void }) {
  const established = evidence.filter((item) => item.status !== "missing");
  return <div className="flow-step"><div className="step-intro"><span className="step-kicker">Step 4 of 5</span><h2>Application assessment</h2><p>Here is what ClearGov can establish from the information and evidence submitted so far.</p></div><div className={`assessment-banner ${outcome.complete ? "assessment-banner--good" : "assessment-banner--attention"}`}><div className="assessment-symbol">{outcome.complete ? <Check size={21} /> : <CircleAlert size={21} />}</div><div><span>Current status</span><b>{outcome.complete ? "Application can proceed" : "Additional evidence required"}</b><p>{outcome.complete ? "All listed evidence has been submitted for assessment." : `${outcome.missing.length} requirement${outcome.missing.length === 1 ? "" : "s"} cannot yet be established.`}</p></div></div><div className="assessment-columns"><div><h3><Check size={17} /> What has been established</h3>{established.length ? established.map((item) => <div className="assessment-line" key={item.requirement}><b>{item.requirement}</b><StatusBadge status="verified" /></div>) : <p className="muted">No evidence has been submitted yet.</p>}</div><div><h3><CircleAlert size={17} /> What cannot yet be established</h3>{outcome.missing.length ? outcome.missing.map((item) => <div className="assessment-line assessment-line--issue" key={item.requirement}><b>{item.requirement}</b><StatusBadge status="missing" /></div>) : <p className="muted">Nothing outstanding.</p>}</div></div>{!outcome.complete && <div className="next-action"><span>Next action</span><b>Submit the missing evidence before continuing.</b><button className="text-button" onClick={onBack}>Return to evidence <ArrowRight size={15} /></button></div>}<FlowFooter label={outcome.complete ? "Review decision" : "Save and exit"} onClick={onContinue} /></div>;
}
function FlowFooter({ label, onClick, disabled = false }: { label: string; onClick: () => void; disabled?: boolean }) { return <div className="flow-footer"><button className="button button--primary" onClick={onClick} disabled={disabled}>{label}<ArrowRight size={16} /></button></div>; }