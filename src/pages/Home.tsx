import {
  ArrowRight,
  Bell,
  Check,
  FileText,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
} from "../lib/icons";

import { Application, Service } from "../types";
import { ServiceCard } from "../components/ServiceCard";

export function Home({
  services,
  applications,
  onStart,
  onOpenService,
  onExplore,
}: {
  services: Service[];
  applications: Application[];
  onStart: (service?: Service) => void;
  onOpenService: (service: Service) => void;
  onExplore: () => void;
}) {
  return (
    <main className="government-home">

      {/* =====================================================
          GOVERNMENT INFORMATION BANNER
          ===================================================== */}

      <section className="gov-banner">

        {/* LEFT — CLEARGOV PUBLIC SERVICE EMBLEM */}
        <div className="gov-emblem">

          <div className="emblem-circle">
            <span>🏛️</span>
          </div>

          <div className="emblem-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <small>PUBLIC SERVICE</small>

        </div>


        {/* CENTER — GOVERNMENT MESSAGE */}
        <div className="gov-banner-content">

          <strong>
            A more transparent, accessible and inclusive government
          </strong>

          <p>
            ClearGov helps you access public services with clarity,
            fairness and confidence.
          </p>

        </div>


        {/* RIGHT — THREE-COLOUR DIGITAL SERVICES DESIGN */}
        <div className="tricolour-art">

          <div className="tri-wave tri-orange"></div>

          <div className="tri-wave tri-white"></div>

          <div className="tri-wave tri-green"></div>


          <div className="digital-service-text">

            <strong>Digital</strong>

            <strong>Services</strong>

            <span>
              for a better tomorrow
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="gov-content">

        {/* ===================================================
            MAIN COLUMN
            =================================================== */}

        <div className="gov-main-column">

          {/* WELCOME */}

          <section className="welcome-section">

            <span className="gov-eyebrow">
              CITIZEN PORTAL
            </span>

            <h1>
              Welcome to ClearGov
            </h1>

            <p>
              Access government services and track your applications
              in one place.
            </p>


            {/* SEARCH */}

            <div className="service-search">

              <Search
                size={21}
                aria-hidden="true"
              />

              <input
                type="text"
                placeholder="Search for a service (e.g. scholarship, housing, licence...)"
                aria-label="Search for a service"
              />

              <button
                type="button"
                onClick={onExplore}
              >
                Search
              </button>

            </div>

          </section>


          {/* =================================================
              POPULAR SERVICES
              ================================================= */}

          <section className="gov-section">

            <div className="gov-section-header">

              <div>

                <span className="gov-eyebrow">
                  SERVICES
                </span>

                <h2>
                  Popular services
                </h2>

              </div>


              <button
                type="button"
                className="view-all-button"
                onClick={onExplore}
              >

                View all services

                <ArrowRight size={16} />

              </button>

            </div>


            <div className="government-service-grid">

              {services.slice(0, 4).map((service) => (

                <ServiceCard
                  key={service.id}
                  service={service}
                  onOpen={onOpenService}
                  featured
                />

              ))}

            </div>

          </section>


          {/* =================================================
              MY APPLICATIONS
              ================================================= */}

          <section className="applications-panel">

            <div className="gov-section-header">

              <div>

                <span className="gov-eyebrow">
                  APPLICATIONS
                </span>

                <h2>
                  My applications
                </h2>

              </div>


              {applications.length > 0 && (

                <button
                  type="button"
                  className="view-all-button"
                >

                  View all

                  <ArrowRight size={16} />

                </button>

              )}

            </div>


            {applications.length === 0 ? (

              <div className="government-empty-state">

                <div className="empty-document-icon">

                  <FileText size={30} />

                </div>


                <div>

                  <h3>
                    You haven't started any applications yet
                  </h3>

                  <p>
                    Start an application to see its progress,
                    evidence assessment and next steps here.
                  </p>


                  <button
                    type="button"
                    className="primary-gov-button"
                    onClick={() => onStart()}
                  >

                    Start an application

                    <ArrowRight size={17} />

                  </button>

                </div>

              </div>

            ) : (

              <div className="application-list">

                {applications.map((application) => (

                  <button
                    type="button"
                    key={application.id}
                    className="application-row"
                    onClick={() => onStart()}
                  >

                    <div className="application-icon">

                      <FileText size={20} />

                    </div>


                    <div className="application-info">

                      <strong>
                        {application.serviceName}
                      </strong>

                      <span>

                        Started{" "}

                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}

                      </span>

                    </div>


                    <ArrowRight size={18} />

                  </button>

                ))}

              </div>

            )}

          </section>


          {/* =================================================
              CLEAR PROCESS
              ================================================= */}

          <section className="process-panel">

            <div className="process-item">

              <div className="process-icon process-icon-green">

                <Check size={21} />

              </div>


              <div>

                <strong>
                  Clear process
                </strong>

                <p>
                  Understand requirements before you apply.
                </p>

              </div>

            </div>


            <div className="process-item">

              <div className="process-icon process-icon-blue">

                <ShieldCheck size={21} />

              </div>


              <div>

                <strong>
                  Fair assessment
                </strong>

                <p>
                  Evidence is assessed consistently and transparently.
                </p>

              </div>

            </div>


            <div className="process-item">

              <div className="process-icon process-icon-orange">

                <LockKeyhole size={21} />

              </div>


              <div>

                <strong>
                  Your data is secure
                </strong>

                <p>
                  Your application information stays private and protected.
                </p>

              </div>

            </div>

          </section>

        </div>


        {/* ===================================================
            RIGHT SIDEBAR
            =================================================== */}

        <aside className="gov-side-column">

          {/* NOTIFICATIONS */}

          <section className="gov-side-card">

            <div className="side-card-header">

              <h3>
                Notifications
              </h3>

              <button
                type="button"
                className="side-view-button"
              >

                View all

                <ArrowRight size={15} />

              </button>

            </div>


            <div className="notification-empty">

              <div className="notification-icon">

                <Bell size={42} />

              </div>


              <strong>
                No new notifications
              </strong>

              <p>
                We'll notify you about important updates
                to your applications here.
              </p>

            </div>

          </section>


          {/* HELP */}

          <section className="gov-side-card">

            <div className="side-card-header">

              <h3>
                Need help?
              </h3>

            </div>


            <button
              type="button"
              className="help-row"
            >

              <div className="help-icon">

                <Search size={22} />

              </div>


              <div>

                <strong>
                  Help Centre
                </strong>

                <span>
                  Guides and frequently asked questions
                </span>

              </div>


              <ArrowRight size={17} />

            </button>


            <button
              type="button"
              className="help-row"
            >

              <div className="help-icon">

                <FileText size={22} />

              </div>


              <div>

                <strong>
                  Application support
                </strong>

                <span>
                  Get help with your application
                </span>

              </div>


              <ArrowRight size={17} />

            </button>


            <button
              type="button"
              className="help-row"
            >

              <div className="help-icon">

                <LockKeyhole size={22} />

              </div>


              <div>

                <strong>
                  Privacy & security
                </strong>

                <span>
                  Learn how your information is protected
                </span>

              </div>


              <ArrowRight size={17} />

            </button>

          </section>


          {/* =================================================
              CLEARGOV JOURNEY
              ================================================= */}

          <section className="journey-side-card">

            <div className="journey-side-title">

              <Sparkles size={18} />

              CLEAR GOV JOURNEY

            </div>


            <h3>

              From evidence
              <br />
              to decision.

            </h3>


            <div className="journey-step completed">

              <span>
                1
              </span>


              <div>

                <strong>
                  Applicant information
                </strong>

                <small>
                  Information provided
                </small>

              </div>


              <Check size={16} />

            </div>


            <div className="journey-step">

              <span>
                2
              </span>


              <div>

                <strong>
                  Evidence assessment
                </strong>

                <small>
                  Documents and evidence checked
                </small>

              </div>

            </div>


            <div className="journey-step">

              <span>
                3
              </span>


              <div>

                <strong>
                  Decision & next action
                </strong>

                <small>
                  Clear explanation of what happens next
                </small>

              </div>

            </div>

          </section>

        </aside>

      </div>


      {/* =====================================================
          SECURITY STRIP
          ===================================================== */}

      <section className="security-strip">

        <div className="security-main">

          <ShieldCheck size={25} />

          <div>

            <strong>
              Your information is protected
            </strong>

            <span>
              ClearGov is designed around privacy, transparency
              and secure handling of application information.
            </span>

          </div>

        </div>


        <div className="security-tag">

          <Check size={15} />

          Evidence-led

        </div>

      </section>

    </main>
  );
}