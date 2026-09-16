import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { api } from "./lib/api";
import { Application, Service } from "./types";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { ApplicationFlow } from "./pages/ApplicationFlow";
import { Reviewer } from "./pages/Reviewer";
import { Help } from "./pages/Help";

type Page =
  | "home"
  | "services"
  | "applications"
  | "help"
  | "detail"
  | "application"
  | "reviewer";

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState<Page>("home");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeApplication, setActiveApplication] =
    useState<Application | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    api.getServices().then(setServices);
    api.getApplications().then(setApplications);
  }, []);

  const go = (next: Page) => {
    setPage(next);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openService = (service: Service) => {
    setSelectedService(service);
    go("detail");
  };

  const start = async (service = selectedService ?? services[0]) => {
    if (!service) return;

    setSelectedService(service);

    const app = await api
      .createApplication(service.id)
      .catch(() => null);

    setActiveApplication(app);
    go("application");
  };

  const saveApp = (app: Application) => {
    setActiveApplication(app);

    setApplications((current) =>
      current.some((item) => item.id === app.id)
        ? current.map((item) =>
            item.id === app.id ? app : item
          )
        : [...current, app]
    );
  };

  const nav = (target: string) => {
    if (
      target === "home" ||
      target === "services" ||
      target === "applications" ||
      target === "help" ||
      target === "reviewer"
    ) {
      go(target);
    } else {
      go("home");
    }
  };

  const showReviewer = page === "reviewer";

  return (
    <div className={`app ${sidebarOpen ? "sidebar-open" : ""}`}>

      {/* Header */}
      <Header
        onMenu={() => setSidebarOpen((current) => !current)}
        onHome={() => go("home")}
        onApplications={() => go("applications")}
        onServices={() => go("services")}
        onHelp={() => go("help")}
      />

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        active={showReviewer ? "reviewer" : page}
        onClose={() => setSidebarOpen(false)}
        onNavigate={nav}
      />

      {/* Mobile / overlay background */}
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Pages */}

      {page === "home" && (
        <Home
          services={services}
          applications={applications}
          onStart={start}
          onOpenService={openService}
          onExplore={() => go("services")}
        />
      )}

      {page === "services" && (
        <Services
          services={services}
          onOpen={openService}
        />
      )}

      {page === "detail" && selectedService && (
        <ServiceDetail
          service={selectedService}
          onBack={() => go("services")}
          onStart={() => start(selectedService)}
        />
      )}

      {page === "applications" && (
        <ApplicationsPage
          applications={applications}
          onStart={start}
        />
      )}

      {page === "application" && selectedService && (
        <ApplicationFlow
          service={selectedService}
          application={activeApplication}
          onSave={saveApp}
          onExit={() => go("home")}
        />
      )}

      {page === "reviewer" && (
        <Reviewer
          onExit={() => go("home")}
        />
      )}

      {page === "help" && <Help />}

      {/* Footer */}
      <footer className="site-footer">
        <div>
          <b>
            CLEAR<span>GOV</span>
          </b>

          <span>
            From Evidence to Decision
          </span>
        </div>

        <span>
          Built for clear, fair public services.
        </span>
      </footer>
    </div>
  );
}

/* =========================================================
   MY APPLICATIONS PAGE
   ========================================================= */

function ApplicationsPage({
  applications,
  onStart,
}: {
  applications: Application[];
  onStart: () => void;
}) {
  return (
    <main className="page-shell applications-page">

      <div className="page-intro">
        <div>
          <span className="eyebrow">
            Your account
          </span>

          <h1>
            My applications
          </h1>

          <p>
            Track the applications you start and the next action
            for each one.
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="wide-empty">

          <div className="empty-state">

            <div className="empty-icon">
              +
            </div>

            <h3>
              No applications yet
            </h3>

            <p>
              Applications you start or submit will appear here.
            </p>

            <button
              className="button button--primary button--small"
              onClick={onStart}
            >
              Start an application
            </button>

          </div>

        </div>
      ) : (
        applications.map((app) => (
          <button
            className="application-row application-row--wide"
            key={app.id}
            onClick={onStart}
          >

            <span>
              <b>
                {app.serviceName}
              </b>

              <small>
                Draft · Updated{" "}
                {new Date(
                  app.updatedAt
                ).toLocaleDateString()}
              </small>
            </span>

            <span className="application-status">
              In progress
            </span>

          </button>
        ))
      )}

    </main>
  );
}