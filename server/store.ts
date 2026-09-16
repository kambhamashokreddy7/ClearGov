import { randomUUID } from "node:crypto";
import { Application } from "./types.js";

const applications = new Map<string, Application>();

export const store = {
  listApplications(): Application[] {
    return [...applications.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },
  getApplication(id: string) {
    return applications.get(id);
  },
  createApplication(serviceId: string, serviceName: string, evidence: Application["evidence"]): Application {
    const now = new Date().toISOString();
    const application: Application = { id: `CG-${randomUUID().slice(0, 8).toUpperCase()}`, serviceId, serviceName, createdAt: now, updatedAt: now, currentStep: 0, information: {}, evidence };
    applications.set(application.id, application);
    return application;
  },
  updateApplication(application: Application) {
    applications.set(application.id, { ...application, updatedAt: new Date().toISOString() });
    return applications.get(application.id)!;
  }
};