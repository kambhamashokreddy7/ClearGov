import { Landmark } from "../lib/icons";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`} aria-label="ClearGov home">
      <span className="brand-mark"><Landmark size={19} strokeWidth={2.2} /></span>
      <span>
        <strong>CLEAR<span>GOV</span></strong>
        {!compact && <small>From Evidence to Decision</small>}
      </span>
    </div>
  );
}