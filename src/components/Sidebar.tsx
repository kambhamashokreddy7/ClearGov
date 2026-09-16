import { ClipboardCheck, FileText, HelpCircle, Home, LifeBuoy, ListChecks, ShieldCheck, X, type LucideIcon } from "lucide-react";
import { Brand } from "./Brand";

export function Sidebar({
  open,
  active,
  onClose,
  onNavigate,
  reviewer = false
}: {
  open: boolean;
  active: string;
  onClose: () => void;
  onNavigate: (page: string) => void;
  reviewer?: boolean;
}) {
  const items: Array<[string, string, LucideIcon]> = reviewer
    ? [
        ["reviewer", "Dashboard", Home],
        ["queue", "Review queue", ListChecks],
        ["review-applications", "Applications", FileText],
        ["issues", "Evidence issues", ShieldCheck],
        ["decisions", "Decisions", ClipboardCheck]
      ]
    : [
        ["home", "Overview", Home],
        ["services", "Services", ListChecks],
        ["applications", "My applications", FileText],
        ["help", "Help centre", LifeBuoy]
      ];
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "is-visible" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "is-open" : ""}`}>
        <div className="sidebar-top">
          <Brand compact />
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close navigation"><X size={19} /></button>
        </div>
        <div className="workspace-label">{reviewer ? "Reviewer workspace" : "Citizen portal"}</div>
        <nav className="side-nav" aria-label="Portal navigation">
          {items.map(([id, label, Icon]) => (
            <button key={id} className={active === id ? "is-active" : ""} onClick={() => { onNavigate(id); onClose(); }}>
              <Icon size={18} strokeWidth={active === id ? 2.4 : 1.8} /><span>{label}</span>
              {active === id && <span className="nav-active-line" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="privacy-note"><ShieldCheck size={17} /><span>Your information is protected and only used for your application.</span></div>
          <button className="side-help" onClick={() => onNavigate("help")}><HelpCircle size={17} /> Help and accessibility</button>
        </div>
      </aside>
    </>
  );
}