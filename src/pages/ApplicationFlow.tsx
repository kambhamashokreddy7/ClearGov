import { ChangeEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  FileCheck2,
  FileText,
  Info,
  Upload,
} from "../lib/icons";
import { Application, EvidenceItem, Service } from "../types";
import { ProgressSteps } from "../components/Steps";
import { StatusBadge } from "../components/StatusBadge";

type InfoField = {
  key: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
};

/* =========================================================
   SERVICE-SPECIFIC INFORMATION FIELDS
   ========================================================= */

const commonFields: InfoField[] = [
  {
    key: "fullName",
    label: "Full name",
    placeholder: "Enter your legal name",
    required: true,
  },
  {
    key: "dateOfBirth",
    label: "Date of birth",
    placeholder: "DD / MM / YYYY",
    type: "date",
  },
  {
    key: "applicantId",
    label: "Applicant ID",
    placeholder: "If you have one",
  },
  {
    key: "residence",
    label: "Residence",
    placeholder: "Town, city, or region",
  },
];

const scholarshipFields: InfoField[] = [
  ...commonFields,
  {
    key: "institution",
    label: "Institution",
    placeholder: "School, college, or university",
    required: true,
  },
  {
    key: "academicScore",
    label: "Academic score",
    placeholder: "Your latest score or grade",
  },
  {
    key: "annualFamilyIncome",
    label: "Annual family income",
    placeholder: "Include the currency",
  },
  {
    key: "course",
    label: "Course / Program",
    placeholder: "Enter your course or program",
  },
  {
    key: "yearOfStudy",
    label: "Year of study",
    placeholder: "e.g. 1st year",
  },
];

const healthcareFields: InfoField[] = [
  ...commonFields,
  {
    key: "patientId",
    label: "Patient ID",
    placeholder: "Enter patient ID if available",
  },
  {
    key: "medicalCondition",
    label: "Medical condition",
    placeholder: "Enter the relevant medical condition",
    required: true,
  },
  {
    key: "insuranceProvider",
    label: "Insurance provider",
    placeholder: "Enter insurance provider",
  },
  {
    key: "insuranceNumber",
    label: "Insurance number",
    placeholder: "Enter insurance number",
  },
  {
    key: "hospital",
    label: "Hospital / Healthcare provider",
    placeholder: "Enter hospital or provider name",
  },
];

const housingFields: InfoField[] = [
  ...commonFields,
  {
    key: "householdSize",
    label: "Household size",
    placeholder: "Number of people in household",
    required: true,
  },
  {
    key: "annualFamilyIncome",
    label: "Annual household income",
    placeholder: "Include the currency",
    required: true,
  },
  {
    key: "employmentStatus",
    label: "Employment status",
    placeholder: "e.g. Employed, unemployed, self-employed",
  },
  {
    key: "currentHousing",
    label: "Current housing situation",
    placeholder: "Describe your current housing",
  },
  {
    key: "housingNeed",
    label: "Housing need",
    placeholder: "Describe the assistance required",
  },
];

const financialFields: InfoField[] = [
  ...commonFields,
  {
    key: "employmentStatus",
    label: "Employment status",
    placeholder: "e.g. Employed, unemployed, self-employed",
  },
  {
    key: "annualFamilyIncome",
    label: "Annual household income",
    placeholder: "Include the currency",
    required: true,
  },
  {
    key: "householdSize",
    label: "Household size",
    placeholder: "Number of people in household",
  },
  {
    key: "financialNeed",
    label: "Reason for financial assistance",
    placeholder: "Describe your financial need",
    required: true,
  },
  {
    key: "bankAccount",
    label: "Bank account details",
    placeholder: "Enter account information if required",
  },
];

const licenceFields: InfoField[] = [
  ...commonFields,
  {
    key: "licenceType",
    label: "Licence type",
    placeholder: "Select or enter licence type",
    required: true,
  },
  {
    key: "existingLicenceNumber",
    label: "Existing licence number",
    placeholder: "If you already have a licence",
  },
  {
    key: "experience",
    label: "Relevant experience",
    placeholder: "Describe your relevant experience",
  },
];

const educationFields: InfoField[] = [
  ...commonFields,
  {
    key: "institution",
    label: "Institution",
    placeholder: "School, college, or university",
    required: true,
  },
  {
    key: "course",
    label: "Course / Program",
    placeholder: "Enter your course or program",
  },
  {
    key: "academicScore",
    label: "Academic score",
    placeholder: "Your latest score or grade",
  },
  {
    key: "yearOfStudy",
    label: "Year of study",
    placeholder: "e.g. 1st year",
  },
];

const defaultFields: InfoField[] = [
  ...commonFields,
  {
    key: "additionalInformation",
    label: "Additional information",
    placeholder: "Provide relevant information",
  },
];

/* =========================================================
   FIND FIELDS FOR SELECTED SERVICE
   ========================================================= */

function getServiceFields(service: Service): InfoField[] {
  const name = service.name.toLowerCase();
  const category = service.category.toLowerCase();

  if (
    name.includes("health") ||
    name.includes("medical") ||
    name.includes("healthcare") ||
    category.includes("health")
  ) {
    return healthcareFields;
  }

  if (
    name.includes("scholarship") ||
    name.includes("student") ||
    category.includes("scholarship")
  ) {
    return scholarshipFields;
  }

  if (
    name.includes("housing") ||
    name.includes("home") ||
    category.includes("housing")
  ) {
    return housingFields;
  }

  if (
    name.includes("financial") ||
    name.includes("assistance") ||
    name.includes("support") ||
    category.includes("financial")
  ) {
    return financialFields;
  }

  if (
    name.includes("licence") ||
    name.includes("license") ||
    name.includes("permit") ||
    category.includes("licence") ||
    category.includes("license")
  ) {
    return licenceFields;
  }

  if (
    name.includes("education") ||
    category.includes("education")
  ) {
    return educationFields;
  }

  return defaultFields;
}

/* =========================================================
   MAIN APPLICATION FLOW
   ========================================================= */

export function ApplicationFlow({
  service,
  application,
  onSave,
  onExit,
}: {
  service: Service;
  application: Application | null;
  onSave: (app: Application) => void;
  onExit: () => void;
}) {
  const [step, setStep] = useState(application?.currentStep ?? 0);

  const [information, setInformation] = useState<Record<string, string>>(
    application?.information ?? {}
  );

  const [evidence, setEvidence] = useState<EvidenceItem[]>(
    application?.evidence ??
      service.evidence.map((required) => ({
        requirement: required,
        required,
        status: "missing",
      }))
  );

  const [saved, setSaved] = useState(false);

  const infoFields = useMemo(
    () => getServiceFields(service),
    [service]
  );

  const requiredFields = infoFields.filter(
    (field) => field.required
  );

  const canContinue =
    step !== 1 ||
    requiredFields.every(
      (field) => Boolean(information[field.key]?.trim())
    );

  const currentApp =
    application ??
    ({
      id: "draft",
      serviceId: service.id,
      serviceName: service.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentStep: step,
      information,
      evidence,
    } as Application);

  const outcome = useMemo(() => {
    const missing = evidence.filter(
      (item) => item.status === "missing"
    );

    return {
      missing,
      complete: missing.length === 0,
    };
  }, [evidence]);

  const update = (key: string, value: string) => {
    setInformation((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const continueFlow = () => {
    if (!canContinue) return;

    const next = Math.min(step + 1, 4);

    const nextApp = {
      ...currentApp,
      currentStep: next,
      information,
      evidence,
      updatedAt: new Date().toISOString(),
    };

    onSave(nextApp);
    setStep(next);
    setSaved(true);
  };

  const fileSelected = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setEvidence((items) =>
      items.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              fileName: file.name,
              status: "uploaded",
            }
          : item
      )
    );

    setSaved(false);
  };

  return (
    <main className="page-shell flow-page">

      <div className="flow-top">
        <button
          className="back-link"
          onClick={onExit}
        >
          <ArrowLeft size={16} />
          Exit application
        </button>

        <span className="save-note">
          {saved ? (
            <>
              <Check size={14} />
              Saved
            </>
          ) : (
            "Draft application"
          )}
        </span>
      </div>

      <div className="flow-header">
        <div>
          <span className="eyebrow">
            Application for
          </span>

          <h1>{service.name}</h1>
        </div>

        <ProgressSteps current={step} />
      </div>

      <div className="flow-card">

        {step === 0 && (
          <StepService
            service={service}
            onContinue={continueFlow}
          />
        )}

        {step === 1 && (
          <StepInformation
            service={service}
            fields={infoFields}
            values={information}
            onChange={update}
            onContinue={continueFlow}
            canContinue={canContinue}
          />
        )}

        {step === 2 && (
          <StepEvidence
            evidence={evidence}
            onSelect={fileSelected}
            onContinue={continueFlow}
          />
        )}

        {step >= 3 && (
          <StepAssessment
            evidence={evidence}
            outcome={outcome}
            onBack={() => setStep(2)}
            onContinue={onExit}
          />
        )}

      </div>
    </main>
  );
}

/* =========================================================
   STEP 1 — SERVICE
   ========================================================= */

function StepService({
  service,
  onContinue,
}: {
  service: Service;
  onContinue: () => void;
}) {
  return (
    <div className="flow-step">

      <div className="step-intro">
        <span className="step-kicker">
          Step 1 of 5
        </span>

        <h2>
          Check the service details
        </h2>

        <p>
          Make sure this is the service you want to apply for.
          You can review the requirements before continuing.
        </p>
      </div>

      <div className="selected-service">

        <div className="service-icon">
          <FileText size={20} />
        </div>

        <div>
          <span className="service-category">
            {service.category}
          </span>

          <b>{service.name}</b>

          <small>{service.detail}</small>
        </div>

        <Check
          className="selected-check"
          size={19}
        />

      </div>

      <div className="mini-requirements">

        <div>
          <b>Eligibility</b>
          <span>
            {service.eligibility.length} requirements
          </span>
        </div>

        <div>
          <b>Evidence</b>
          <span>
            {service.evidence.length} documents may be needed
          </span>
        </div>

      </div>

      <FlowFooter
        label="Continue"
        onClick={onContinue}
      />

    </div>
  );
}

/* =========================================================
   STEP 2 — DYNAMIC INFORMATION
   ========================================================= */

function StepInformation({
  service,
  fields,
  values,
  onChange,
  onContinue,
  canContinue,
}: {
  service: Service;
  fields: InfoField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onContinue: () => void;
  canContinue: boolean;
}) {
  const missingRequired = fields
    .filter((field) => field.required)
    .filter((field) => !values[field.key]?.trim());

  return (
    <div className="flow-step">

      <div className="step-intro">

        <span className="step-kicker">
          Step 2 of 5
        </span>

        <h2>
          Tell us about yourself
        </h2>

        <p>
          Provide the information relevant to your{" "}
          <b>{service.name}</b>. Fields marked * are required.
        </p>

      </div>

      <div className="why-box">

        <Info size={18} />

        <div>

          <b>
            Why we ask for this information
          </b>

          <p>
            We use these details to identify the requirements
            that apply to your application and compare them
            with your evidence.
          </p>

        </div>

      </div>

      <div className="form-grid">

        {fields.map((field) => (

          <label
            key={field.key}
            className={
              field.required
                ? "field field--required"
                : "field"
            }
          >

            <span>
              {field.label}
              {field.required && " *"}
            </span>

            <input
              type={field.type ?? "text"}
              value={values[field.key] ?? ""}
              onChange={(event) =>
                onChange(
                  field.key,
                  event.target.value
                )
              }
              placeholder={field.placeholder}
            />

          </label>

        ))}

      </div>

      {!canContinue && (
        <div className="form-error">

          <CircleAlert size={16} />

          <span>
            Please provide:{" "}
            {missingRequired
              .map((field) => field.label)
              .join(", ")}
            .
          </span>

        </div>
      )}

      <FlowFooter
        label="Continue to evidence"
        onClick={onContinue}
        disabled={!canContinue}
      />

    </div>
  );
}

/* =========================================================
   STEP 3 — EVIDENCE
   ========================================================= */

function StepEvidence({
  evidence,
  onSelect,
  onContinue,
}: {
  evidence: EvidenceItem[];
  onSelect: (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  onContinue: () => void;
}) {
  return (
    <div className="flow-step">

      <div className="step-intro">

        <span className="step-kicker">
          Step 3 of 5
        </span>

        <h2>
          Submit your evidence
        </h2>

        <p>
          Upload the documents available to you. ClearGov
          will show you what has been established and what
          needs attention.
        </p>

      </div>

      <div className="upload-list">

        {evidence.map((item, index) => (

          <div
            className="upload-card"
            key={item.requirement}
          >

            <div className="upload-card-top">

              <div className="upload-requirement">

                <span className="upload-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>

                  <b>{item.requirement}</b>

                  <small>
                    Required: {item.required}
                  </small>

                </div>

              </div>

              {item.status !== "missing" && (
                <StatusBadge
                  status={item.status}
                />
              )}

            </div>

            {item.fileName ? (

              <div className="file-added">

                <FileCheck2 size={17} />

                <span>
                  {item.fileName}
                </span>

                <small>
                  Ready for assessment
                </small>

              </div>

            ) : (

              <label className="upload-drop">

                <Upload size={18} />

                <span>

                  <b>
                    Upload document
                  </b>

                  <small>
                    PDF, JPG, or PNG · Max 10 MB
                  </small>

                </span>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) =>
                    onSelect(index, event)
                  }
                />

              </label>

            )}

          </div>

        ))}

      </div>

      <div className="upload-note">

        <Info size={16} />

        Don’t have a document ready? You can continue
        and return to it later.

      </div>

      <FlowFooter
        label="Continue to assessment"
        onClick={onContinue}
      />

    </div>
  );
}

/* =========================================================
   STEP 4 — ASSESSMENT
   ========================================================= */

function StepAssessment({
  evidence,
  outcome,
  onBack,
  onContinue,
}: {
  evidence: EvidenceItem[];
  outcome: {
    missing: EvidenceItem[];
    complete: boolean;
  };
  onBack: () => void;
  onContinue: () => void;
}) {
  const established = evidence.filter(
    (item) => item.status !== "missing"
  );

  return (
    <div className="flow-step">

      <div className="step-intro">

        <span className="step-kicker">
          Step 4 of 5
        </span>

        <h2>
          Application assessment
        </h2>

        <p>
          Here is what ClearGov can establish from the
          information and evidence submitted so far.
        </p>

      </div>

      <div
        className={`assessment-banner ${
          outcome.complete
            ? "assessment-banner--good"
            : "assessment-banner--attention"
        }`}
      >

        <div className="assessment-symbol">

          {outcome.complete ? (
            <Check size={21} />
          ) : (
            <CircleAlert size={21} />
          )}

        </div>

        <div>

          <span>
            Current status
          </span>

          <b>
            {outcome.complete
              ? "Application can proceed"
              : "Additional evidence required"}
          </b>

          <p>
            {outcome.complete
              ? "All listed evidence has been submitted for assessment."
              : `${outcome.missing.length} requirement${
                  outcome.missing.length === 1
                    ? ""
                    : "s"
                } cannot yet be established.`}
          </p>

        </div>

      </div>

      <div className="assessment-columns">

        <div>

          <h3>
            <Check size={17} />
            What has been established
          </h3>

          {established.length ? (

            established.map((item) => (

              <div
                className="assessment-line"
                key={item.requirement}
              >

                <b>
                  {item.requirement}
                </b>

                <StatusBadge status="verified" />

              </div>

            ))

          ) : (

            <p className="muted">
              No evidence has been submitted yet.
            </p>

          )}

        </div>

        <div>

          <h3>
            <CircleAlert size={17} />
            What cannot yet be established
          </h3>

          {outcome.missing.length ? (

            outcome.missing.map((item) => (

              <div
                className="assessment-line assessment-line--issue"
                key={item.requirement}
              >

                <b>
                  {item.requirement}
                </b>

                <StatusBadge status="missing" />

              </div>

            ))

          ) : (

            <p className="muted">
              Nothing outstanding.
            </p>

          )}

        </div>

      </div>

      {!outcome.complete && (

        <div className="next-action">

          <span>
            Next action
          </span>

          <b>
            Submit the missing evidence before continuing.
          </b>

          <button
            className="text-button"
            onClick={onBack}
          >
            Return to evidence
            <ArrowRight size={15} />
          </button>

        </div>

      )}

      <FlowFooter
        label={
          outcome.complete
            ? "Review decision"
            : "Save and exit"
        }
        onClick={onContinue}
      />

    </div>
  );
}

/* =========================================================
   FOOTER BUTTON
   ========================================================= */

function FlowFooter({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flow-footer">

      <button
        className="button button--primary"
        onClick={onClick}
        disabled={disabled}
      >
        {label}
        <ArrowRight size={16} />
      </button>

    </div>
  );
}