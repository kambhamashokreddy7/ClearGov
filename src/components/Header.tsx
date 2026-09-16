import { Bell, Menu, UserRound } from "../lib/icons";
import { Brand } from "./Brand";

export function Header({
  onMenu,
  onHome,
  onApplications,
  onServices,
  onHelp
}: {
  onMenu: () => void;
  onHome: () => void;
  onApplications: () => void;
  onServices: () => void;
  onHelp: () => void;
}) {
  return (
    <header className="topbar">
      <button className="mobile-menu icon-button" onClick={onMenu} aria-label="Open navigation"><Menu size={21} /></button>
      <button className="brand-button" onClick={onHome}><Brand /></button>
      <nav className="topnav" aria-label="Main navigation">
        <button onClick={onServices}>Services</button>
        <button onClick={onApplications}>My Applications</button>
        <button onClick={onHelp}>Help</button>
      </nav>
      <div className="topbar-actions">
        <button className="icon-button notification-button" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>
        <span className="topbar-rule" />
        <button className="account-button" aria-label="Open account menu">
          <span className="avatar"><UserRound size={16} /></span>
          <span className="account-copy"><b>Welcome</b><small>New account</small></span>
        </button>
      </div>
    </header>
  );
}