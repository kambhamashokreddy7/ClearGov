import express from "express";
import cors from "cors";
import multer from "multer";
import { z } from "zod";
import { services } from "./services.js";
import { assess } from "./assessment.js";
import { store } from "./store.js";

const app = express();
const port = Number(process.env.PORT || 4000);
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => response.json({ ok: true, service: "cleargov-api" }));
app.get("/api/services", (_request, response) => response.json(services));
app.get("/api/services/:id", (request, response) => {
  const service = services.find((item) => item.id === request.params.id);
  return service ? response.json(service) : response.status(404).json({ message: "Service not found" });
});
app.get("/api/applications", (_request, response) => response.json(store.listApplications()));
app.post("/api/applications", (request, response) => {
  const parsed = z.object({ serviceId: z.string() }).safeParse(request.body);
  if (!parsed.success) return response.status(400).json({ message: "A service is required." });
  const service = services.find((item) => item.id === parsed.data.serviceId);
  if (!service) return response.status(404).json({ message: "Service not found." });
  const evidence = service.evidence.map((required) => ({ requirement: required, required, status: "missing" as const }));
  return response.status(201).json(store.createApplication(service.id, service.name, evidence));
});
app.patch("/api/applications/:id/information", (request, response) => {
  const application = store.getApplication(String(request.params.id));
  if (!application) return response.status(404).json({ message: "Application not found." });
  const parsed = z.record(z.string()).safeParse(request.body);
  if (!parsed.success) return response.status(400).json({ message: "Information must be text fields." });
  application.information = { ...application.information, ...parsed.data };
  application.currentStep = Math.max(application.currentStep, 2);
  return response.json(store.updateApplication(application));
});
app.post("/api/applications/:id/evidence/:index", upload.single("document"), (request, response) => {
  const application = store.getApplication(String(request.params.id));
  const index = Number(request.params.index);
  if (!application) return response.status(404).json({ message: "Application not found." });
  if (!request.file || !application.evidence[index]) return response.status(400).json({ message: "A supported document is required." });
  application.evidence[index] = { ...application.evidence[index], fileName: request.file.originalname, status: "uploaded" };
  application.currentStep = Math.max(application.currentStep, 3);
  return response.json(store.updateApplication(application));
});
app.post("/api/applications/:id/assess", (request, response) => {
  const application = store.getApplication(request.params.id);
  if (!application) return response.status(404).json({ message: "Application not found." });
  application.assessment = assess(application);
  application.currentStep = 3;
  return response.json(store.updateApplication(application));
});
app.get("/api/reviewer/summary", (_request, response) => {
  const apps = store.listApplications();
  response.json({ applications: apps.length, reviewQueue: apps.filter((item) => item.assessment?.outcome === "human_review").length, evidenceIssues: apps.filter((item) => (item.assessment?.issues.length ?? 0) > 0).length, decisions: 0 });
});
app.get("/api/reviewer/queue", (_request, response) => response.json(store.listApplications().filter((item) => item.assessment?.outcome === "human_review")));
app.post("/api/reviewer/:id/action", (request, response) => {
  const application = store.getApplication(request.params.id);
  const action = z.object({ action: z.enum(["approve", "request_evidence", "reject", "escalate"]), note: z.string().optional() }).safeParse(request.body);
  if (!application || !action.success) return response.status(400).json({ message: "Application and valid reviewer action are required." });
  application.assessment = { ...assess(application)!, outcome: action.data.action === "escalate" ? "human_review" : action.data.action === "approve" ? "sufficient" : "additional", nextAction: action.data.note || `Reviewer action recorded: ${action.data.action}.` };
  return response.json(store.updateApplication(application));
});

app.listen(port, () => console.log(`ClearGov API listening on http://localhost:${port}`));