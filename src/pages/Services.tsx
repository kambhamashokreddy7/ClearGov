import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "../lib/icons";
import { categories, Service } from "../types";
import { EmptyState } from "../components/EmptyState";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceCard } from "../components/ServiceCard";

export function Services({ services, onOpen }: { services: Service[]; onOpen: (service: Service) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All services");
  const filtered = useMemo(() => services.filter((service) => (category === "All services" || service.category === category) && `${service.name} ${service.description}`.toLowerCase().includes(query.toLowerCase())), [services, category, query]);
  return <main className="page-shell directory-page"><div className="page-intro"><div><span className="eyebrow">Public service directory</span><h1>All services</h1><p>Find a service, understand its requirements, and prepare with confidence.</p></div><div className="directory-count"><b>{services.length}</b><span>services available</span></div></div>
    <div className="directory-layout"><aside className="category-panel"><div className="filter-title"><SlidersHorizontal size={16} /> Filter by category</div><button className={category === "All services" ? "selected" : ""} onClick={() => setCategory("All services")}>All services <span>{services.length}</span></button>{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}<span>{services.filter((service) => service.category === item).length || ""}</span></button>)}</aside>
      <section className="directory-results"><div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services" aria-label="Search services" />{query && <button onClick={() => setQuery("")}>Clear</button>}</div>{filtered.length ? <div className="service-grid">{filtered.map((service) => <ServiceCard service={service} onOpen={onOpen} key={service.id} />)}</div> : <EmptyState type="search" />}</section></div>
  </main>;
}