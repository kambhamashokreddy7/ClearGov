import { ArrowRight, iconMap } from "../lib/icons";
import { Service } from "../types";

export function ServiceCard({ service, onOpen, featured = false }: { service: Service; onOpen: (service: Service) => void; featured?: boolean }) {
  const Icon = iconMap[service.icon];
  return (
    <article className={`service-card ${featured ? "service-card--featured" : ""}`} onClick={() => onOpen(service)} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && onOpen(service)}>
      <div className="service-icon"><Icon size={20} /></div>
      <div className="service-card-body"><span className="service-category">{service.category}</span><h3>{service.name}</h3><p>{service.description}</p></div>
      <button className="card-link" onClick={(event) => { event.stopPropagation(); onOpen(service); }}>View service <ArrowRight size={15} /></button>
    </article>
  );
}