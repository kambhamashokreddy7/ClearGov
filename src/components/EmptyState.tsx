import { FileText, Search } from "../lib/icons";

export function EmptyState({ type, action, onAction }: { type: "applications" | "notifications" | "review" | "search"; action?: string; onAction?: () => void }) {
  const content = {
    applications: { Icon: FileText, title: "No applications yet", text: "Applications you start or submit will appear here." },
    notifications: { Icon: BellIcon, title: "No notifications", text: "You’re all caught up." },
    review: { Icon: ClipboardIcon, title: "No applications require review", text: "When an application needs human attention, it will appear in this queue." },
    search: { Icon: Search, title: "No services found", text: "Try a different search term or category." }
  }[type];
  return (
    <div className="empty-state">
      <div className="empty-icon"><content.Icon size={24} /></div>
      <h3>{content.title}</h3>
      <p>{content.text}</p>
      {action && onAction && <button className="button button--primary button--small" onClick={onAction}>{action}</button>}
    </div>
  );
}
function BellIcon({ size = 24 }: { size?: number }) { return <span style={{ fontSize: size * 0.85 }}>✦</span>; }
function ClipboardIcon({ size = 24 }: { size?: number }) { return <span style={{ fontSize: size * 0.85 }}>✓</span>; }