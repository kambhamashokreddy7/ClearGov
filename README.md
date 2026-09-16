# ClearGov — From Evidence to Decision

ClearGov is a full-stack React + Express starter for an evidence-based public-service workflow. It is intentionally initialized as a **new user**: there are no fake applicants, applications, documents, notifications, decisions, or reviewer statistics.

## Run locally

```bash
npm install
npm run dev
```

- Web app: `http://localhost:5173`
- API: `http://localhost:4000`

For a production build:

```bash
npm run build
npm start
```

## Included product surfaces

- Citizen dashboard with onboarding, empty applications state, popular services, and secure evidence-led positioning.
- Searchable service directory with category filters.
- Service details view with eligibility and evidence requirements.
- Five-stage application journey: service, applicant information, evidence, assessment, and decision.
- Real file selection UI for PDF/JPG/PNG evidence, with local upload state and server-side multer endpoint.
- Rule-based assessment engine that reports established requirements, missing evidence, explanation, and next action.
- Reviewer/admin dashboard with intentionally empty queue and dynamic-stat API endpoints.
- Responsive, keyboard-friendly, high-contrast UI with status text that does not rely on color alone.

## Architecture

The frontend uses React, TypeScript, Vite, Tailwind directives, and Lucide icons. The API uses Express, TypeScript, Zod validation, multer, and a typed in-memory store so the project runs without secrets.

`server/store.ts` is the persistence seam. Replace it with Firebase Admin / Firestore repositories and add Firebase Authentication and Storage wiring for a deployment. Keep the current rule engine in `server/assessment.ts` as the deterministic eligibility and evidence layer; use AI only for extraction, contradiction detection, and explanation support.

## Firebase production wiring

1. Create Firebase Authentication, Firestore, and Storage resources.
2. Add the Firebase Web SDK in `src/lib/firebase.ts` for sign-in and the Firebase Admin SDK in the server.
3. Replace the in-memory methods in `server/store.ts` with collections for `users`, `services`, `requirements`, `applications`, `applicantInformation`, `evidence`, `assessments`, `issues`, `decisions`, `reviewActions`, and `notifications`.
4. Store uploaded evidence in Firebase Storage and persist only metadata + processing status in Firestore.
5. Add OCR/extraction as a background job. Never make automated extraction the final authority for critical eligibility decisions.

## Notes

The uploaded reference image informed the overall information hierarchy and service-card density only. This project uses an original ClearGov identity and does not copy the reference logo, colors, imagery, text, or government identity.